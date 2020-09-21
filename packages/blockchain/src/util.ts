import BN = require('bn.js')

// Geth compatible DB keys

const HEADS_KEY = 'heads'

/**
 * Current canonical head for light sync
 */
const HEAD_HEADER_KEY = 'LastHeader'

/**
 * Current canonical head for full sync
 */
const HEAD_BLOCK_KEY = 'LastBlock'

/**
 * headerPrefix + number + hash -> header
 */
const HEADER_PREFIX = Buffer.from('h')

/**
 * headerPrefix + number + hash + tdSuffix -> td
 */
const TD_SUFFIX = Buffer.from('t')

/**
 * headerPrefix + number + numSuffix -> hash
 */
const NUM_SUFFIX = Buffer.from('n')

/**
 * blockHashPrefix + hash -> number
 */
const BLOCK_HASH_PEFIX = Buffer.from('H')

/**
 * bodyPrefix + number + hash -> block body
 */
const BODY_PREFIX = Buffer.from('b')

// Utility functions

/**
 * Convert BN to big endian Buffer
 */
const bufBE8 = (n: BN) => n.toArrayLike(Buffer, 'be', 8)

const tdKey = (n: BN, hash: Buffer) =>
  Buffer.concat([HEADER_PREFIX, bufBE8(n), hash, TD_SUFFIX])

const headerKey = (n: BN, hash: Buffer) =>
  Buffer.concat([HEADER_PREFIX, bufBE8(n), hash])

const bodyKey = (n: BN, hash: Buffer) =>
  Buffer.concat([BODY_PREFIX, bufBE8(n), hash])

const numberToHashKey = (n: BN) =>
  Buffer.concat([HEADER_PREFIX, bufBE8(n), NUM_SUFFIX])

const hashToNumberKey = (hash: Buffer) =>
  Buffer.concat([BLOCK_HASH_PEFIX, hash])

/**
 * @hidden
 */
export {
  HEADS_KEY,
  HEAD_HEADER_KEY,
  HEAD_BLOCK_KEY,
  bufBE8,
  tdKey,
  headerKey,
  bodyKey,
  numberToHashKey,
  hashToNumberKey,
}
