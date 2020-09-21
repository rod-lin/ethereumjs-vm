import { BlockHeader } from './header'
import { KECCAK256_NULL, toBuffer } from 'ethereumjs-util'
import { BlockOptions } from './types'

/**
 * Creates a new block header object from Ethereum JSON RPC.
 *
 * @param blockParams - Ethereum JSON RPC of block (eth_getBlockByNumber)
 * @param chainOptions - An object describing the blockchain
 */
export default function blockHeaderFromRpc(
  blockParams: any,
  options?: BlockOptions
) {
  const blockHeader = new BlockHeader(
    {
      parentHash: blockParams.parentHash,
      uncleHash: blockParams.sha3Uncles,
      coinbase: blockParams.miner,
      stateRoot: blockParams.stateRoot,
      transactionsTrie: blockParams.transactionsRoot,
      receiptTrie:
        blockParams.receiptRoot || blockParams.receiptsRoot || KECCAK256_NULL,
      bloom: blockParams.logsBloom,
      difficulty: blockParams.difficulty,
      number: blockParams.number,
      gasLimit: blockParams.gasLimit,
      gasUsed: blockParams.gasUsed,
      timestamp: blockParams.timestamp,
      extraData: blockParams.extraData,
      mixHash: blockParams.mixHash,
      nonce: blockParams.nonce,
    },
    options
  )

  // override hash in case something was missing
  blockHeader.hash = function () {
    return toBuffer(blockParams.hash)
  }

  return blockHeader
}
