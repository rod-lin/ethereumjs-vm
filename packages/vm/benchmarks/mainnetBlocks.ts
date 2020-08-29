import * as fs from 'fs'
import { bufferToInt } from 'ethereumjs-util'
import blockFromRPC from '@ethereumjs/block/dist/from-rpc'
import { Block } from '@ethereumjs/block'
import VM from '../dist'
import { getPreState } from './util'

const BLOCK_FIXTURE = 'benchmarks/fixture/blocks-prestate.json'

const onAdd = async (vm: VM, block: Block) => {
  // TODO: validate tx, add receipt and gas usage checks
  await vm.copy().runBlock({
    block,
    generate: true,
    skipBlockValidation: true,
  })
}

export async function mainnetBlocks(suite: any, numSamples?: number) {
  let data = JSON.parse(fs.readFileSync(BLOCK_FIXTURE, 'utf8'))
  if (!Array.isArray(data)) data = [data]
  console.log(`Total number of blocks in data set: ${data.length}`)

  numSamples = numSamples ? numSamples : data.length
  console.log(`Number of blocks to sample: ${numSamples}`)
  data = data.slice(0, numSamples)

  for (const blockData of data) {
    const block = blockFromRPC(blockData.block)
    const blockNumber = bufferToInt(block.header.number)

    const stateManager = await getPreState(blockData.preState)
    const vm = new VM({ stateManager, hardfork: 'muirGlacier' })

    if (suite) {
      suite.add(`Block ${blockNumber}`, onAdd)
    } else {
      onAdd(vm, block)
    }
  }
}
