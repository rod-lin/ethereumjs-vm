import tape from 'tape'
import { BN, toBuffer } from 'ethereumjs-util'
import { Block } from '@ethereumjs/block'
import Common from '@ethereumjs/common'
import Blockchain from '@ethereumjs/blockchain'
import runBlockchain from '../../lib/runBlockchain'
import { DefaultStateManager } from '../../lib/state'
import { createGenesis } from './utils'

const level = require('level-mem')

Error.stackTraceLimit = 100

tape('runBlockchain', (t) => {
  const blockchainDB = level()
  const common = new Common({ chain: 'goerli', hardfork: 'chainstart' })

  const blockchain = new Blockchain({
    db: blockchainDB,
    common,
    validateBlocks: false,
    validatePow: false,
  })

  const stateManager = new DefaultStateManager({ common })

  const vm = {
    stateManager,
    blockchain,
  }

  t.test('should run without a blockchain parameter', async (st) => {
    st.doesNotThrow(async function () {
      // @ts-ignore
      await runBlockchain.bind(vm)()
      st.end()
    })
  })

  t.test('should run without blocks', async (st) => {
    st.doesNotThrow(async function () {
      // @ts-ignore
      await runBlockchain.bind(vm)(blockchain)
      st.end()
    })
  })

  t.test('should run with genesis block', async (st) => {
    try {
      const common = new Common({ chain: 'goerli', hardfork: 'chainstart' })
      const genesis = createGenesis({ common })

      await blockchain.putGenesis(genesis)
      st.ok(blockchain.meta.genesis, 'genesis should be set for blockchain')

      // @ts-ignore
      await runBlockchain.bind(vm)(blockchain)
      st.end()
    } catch (e) {
      st.end(e)
    }
  })

  t.test('should run with valid and invalid blocks', async (st) => {
    // Produce error on the third time runBlock is called
    let runBlockInvocations = 0
    ;(<any>vm).runBlock = () =>
      new Promise((resolve, reject) => {
        runBlockInvocations++
        if (runBlockInvocations === 3) {
          return reject(new Error('test'))
        }
        resolve({})
      })

    const common = new Common({ chain: 'goerli', hardfork: 'chainstart' })
    const genesis = createGenesis({ common })
    await blockchain.putGenesis(genesis)

    const b1 = createBlock(genesis, 1, { common })
    const b2 = createBlock(b1, 2, { common })
    const b3 = createBlock(b2, 3, { common })

    await blockchain.putBlock(b1)
    await blockchain.putBlock(b2)
    await blockchain.putBlock(b3)

    let head = await blockchain.getHead()
    st.deepEqual(head.hash(), b3.hash(), 'block3 should be the current head')

    try {
      // @ts-ignore
      await runBlockchain.bind(vm)(blockchain)
      st.fail('should have returned error')
    } catch (e) {
      st.equal(e.message, 'test')

      head = await blockchain.getHead()
      st.deepEqual(head.hash(), b2.hash(), 'should have removed invalid block from head')

      st.end()
    }
  })
})

function createBlock(parent: Block | undefined, n = 0, opts = {}) {
  if (!parent) {
    return createGenesis(opts)
  }

  const b = new Block(undefined, opts)
  b.header.number = toBuffer(n)
  b.header.parentHash = parent.hash()
  b.header.difficulty = new BN(0xfffffff).toArrayLike(Buffer)
  b.header.stateRoot = parent.header.stateRoot

  return b
}
