# Welcome to ReNFT SDK

![npm](https://img.shields.io/npm/v/@renft/sdk?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@renft/sdk?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@renft/sdk?style=for-the-badge)
![npm](https://img.shields.io/npm/dm/@renft/sdk?style=for-the-badge)

Library to make your life easier with ReNFT.

This sdk will ease out your journey with ReNFT. Among other things it handles

- price packing of collateral and rent prices
- correctly calling the contract to take advantage of the gas savings

## Install

`yarn add @renft/sdk`

## Usage

```javascript
import { providers, Wallet } from 'ethers';
import { ReNFT, PaymentToken } from '@renft/sdk';

const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new providers.JsonRpcProvider(`<your provider url>`);
let wallet = new Wallet(walletMnemonic);
wallet = wallet.connect(provider);

const renft = new ReNFT(wallet);

const TEST_E721_ADDR = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const TEST_E721_TOKENID = '1';

const main = async () => {
  const txn = await renft.lend(
    [TEST_E721_ADDR],
    [TEST_E721_TOKENID],
    [true],
    [1],
    [1],
    [1.1],
    [2.2],
    [PaymentToken.WETH]
  );

  const receipt = await txn.wait();
  return receipt;
};

main()
  .then(receipt => {
    console.log(receipt);
  })
  .catch(e => {
    console.warn(e);
  });
```
