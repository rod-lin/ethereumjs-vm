import { rlp, toBuffer, bufferToInt } from 'ethereumjs-util'
import BN = require('bn.js')
import Blockchain from '../src'
import { Block } from '@ethereumjs/block'
import Common from '@ethereumjs/common'
const level = require('level-mem')

export const generateBlocks = (
  numberOfBlocks: number,
  existingBlocks?: Block[]
): Block[] => {
  const blocks = existingBlocks ? existingBlocks : []
  if (blocks.length === 0) {
    const genesisBlock = new Block(undefined, { initWithGenesisHeader: true })
    genesisBlock.header.gasLimit = toBuffer(8000000)
    blocks.push(genesisBlock)
  }
  const common = new Common({ chain: 'mainnet', hardfork: 'chainstart' })
  for (let i = blocks.length; i < numberOfBlocks; i++) {
    const block = new Block(undefined, { common })
    block.header.number = toBuffer(i)
    block.header.parentHash = blocks[i - 1].hash()
    block.header.difficulty = toBuffer(
      block.header.canonicalDifficulty(blocks[i - 1])
    )
    block.header.gasLimit = toBuffer(8000000)
    block.header.timestamp = toBuffer(
      bufferToInt(blocks[i - 1].header.timestamp) + 1
    )
    blocks.push(block)
  }
  return blocks
}

export const generateBlockchain = async (
  numberOfBlocks: number,
  genesisBlock?: Block
): Promise<any> => {
  const blockchain = new Blockchain({
    validateBlocks: true,
    validatePow: false,
  })
  const existingBlocks: Block[] = genesisBlock ? [genesisBlock] : []
  const blocks = generateBlocks(numberOfBlocks, existingBlocks)

  try {
    await blockchain.putGenesis(blocks[0])
    await blockchain.putBlocks(blocks.slice(1))
  } catch (error) {
    return { error }
  }

  return {
    blockchain,
    blocks,
    error: null,
  }
}

export const isConsecutive = (blocks: Block[]) => {
  return !blocks.some((block: Block, index: number) => {
    if (index === 0) {
      return false
    }
    return (
      Buffer.compare(block.header.parentHash, blocks[index - 1].hash()) !== 0
    )
  })
}

export const createTestDB = async () => {
  const genesis = new Block(undefined, { initWithGenesisHeader: true })
  const db = level()
  await db.batch([
    {
      type: 'put',
      key: Buffer.from('6800000000000000006e', 'hex'),
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: genesis.hash(),
    },
    {
      type: 'put',
      key: Buffer.from(
        '48d4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
        'hex'
      ),
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: Buffer.from('00', 'hex'),
    },
    {
      type: 'put',
      key: 'LastHeader',
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: genesis.hash(),
    },
    {
      type: 'put',
      key: 'LastBlock',
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: genesis.hash(),
    },
    {
      type: 'put',
      key: Buffer.from(
        '680000000000000000d4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
        'hex'
      ),
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: rlp.encode(genesis.header.raw),
    },
    {
      type: 'put',
      key: Buffer.from(
        '680000000000000000d4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa374',
        'hex'
      ),
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: rlp.encode(new BN(17179869184).toBuffer()),
    },
    {
      type: 'put',
      key: Buffer.from(
        '620000000000000000d4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
        'hex'
      ),
      keyEncoding: 'binary',
      valueEncoding: 'binary',
      value: rlp.encode(genesis.serialize(false).slice(1)),
    },
    {
      type: 'put',
      key: 'heads',
      valueEncoding: 'json',
      value: { head0: { type: 'Buffer', data: [171, 205] } },
    },
  ])
  return [db, genesis]
}
