[@ethereumjs/block](../README.md) › ["types"](../modules/_types_.md) › [BlockOptions](_types_.blockoptions.md)

# Interface: BlockOptions

An object to set to which blockchain the blocks and their headers belong. This could be specified
using a Common object, or `chain` and `hardfork`. Defaults to mainnet without specifying a
hardfork.

## Hierarchy

* **BlockOptions**

## Index

### Properties

* [common](_types_.blockoptions.md#optional-common)
* [hardforkByBlockNumber](_types_.blockoptions.md#optional-hardforkbyblocknumber)
* [initWithGenesisHeader](_types_.blockoptions.md#optional-initwithgenesisheader)

## Properties

### `Optional` common

• **common**? : *Common*

*Defined in [types.ts:17](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/block/src/types.ts#L17)*

A Common object defining the chain and the hardfork a block/block header belongs to.

Default: `Common` object set to `mainnet` and the HF currently defined as the default
hardfork in the `Common` class

___

### `Optional` hardforkByBlockNumber

• **hardforkByBlockNumber**? : *undefined | false | true*

*Defined in [types.ts:23](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/block/src/types.ts#L23)*

Determine the HF by the block number

Default: `false` (HF is set to whatever default HF is set by the Common instance)

___

### `Optional` initWithGenesisHeader

• **initWithGenesisHeader**? : *undefined | false | true*

*Defined in [types.ts:34](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/block/src/types.ts#L34)*

Turns the block header into the canonical genesis block header

If set to `true` all other header data is ignored.

If a Common instance is passed the instance need to be set to `chainstart` as a HF,
otherwise usage of this option will throw

Default: `false`
