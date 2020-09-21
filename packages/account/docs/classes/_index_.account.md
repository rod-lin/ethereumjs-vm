[@ethereumjs/account](../README.md) › ["index"](../modules/_index_.md) › [Account](_index_.account.md)

# Class: Account

## Hierarchy

* **Account**

## Index

### Constructors

* [constructor](_index_.account.md#constructor)

### Properties

* [balance](_index_.account.md#balance)
* [codeHash](_index_.account.md#codehash)
* [nonce](_index_.account.md#nonce)
* [stateRoot](_index_.account.md#stateroot)

### Methods

* [isContract](_index_.account.md#iscontract)
* [isEmpty](_index_.account.md#isempty)
* [serialize](_index_.account.md#serialize)

## Constructors

###  constructor

\+ **new Account**(`data?`: any): *[Account](_index_.account.md)*

*Defined in [index.ts:28](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L28)*

Creates a new account object

~~~
const data = [
  '0x02', //nonce
  '0x0384', //balance
  '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421', //stateRoot
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470', //codeHash
]
const account = new Account(data)

const data2 = {
  nonce: '0x0',
  balance: '0x03e7',
  stateRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  codeHash: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
}
const account2 = new Account(data2)
~~~

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data?` | any |  An account can be initialized with either a `buffer` containing the RLP serialized account. Or an `Array` of buffers relating to each of the account Properties, listed in order below.  For `Object` and `Array` each of the elements can either be a `Buffer`, hex `String`, `Number`, or an object with a `toBuffer` method such as `Bignum`.  |

**Returns:** *[Account](_index_.account.md)*

## Properties

###  balance

• **balance**: *Buffer*

*Defined in [index.ts:18](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L18)*

The account's balance in wei.

___

###  codeHash

• **codeHash**: *Buffer*

*Defined in [index.ts:28](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L28)*

The hash of the code of the contract.

___

###  nonce

• **nonce**: *Buffer*

*Defined in [index.ts:13](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L13)*

The account's nonce.

___

###  stateRoot

• **stateRoot**: *Buffer*

*Defined in [index.ts:23](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L23)*

The stateRoot for the storage of the contract.

## Methods

###  isContract

▸ **isContract**(): *boolean*

*Defined in [index.ts:89](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L89)*

Returns a `Boolean` deteremining if the account is a contract.

**Returns:** *boolean*

___

###  isEmpty

▸ **isEmpty**(): *boolean*

*Defined in [index.ts:96](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L96)*

Returns a `Boolean` determining if the account is empty.

**Returns:** *boolean*

___

###  serialize

▸ **serialize**(): *Buffer*

*Defined in [index.ts:82](https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L82)*

Returns the RLP serialization of the account as a `Buffer`.

**Returns:** *Buffer*
