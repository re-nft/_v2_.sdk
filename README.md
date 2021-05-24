# Welcome to ReNFT SDK

Lend and rent any ERC721s and ERC1155s on Ethereum mainnet. This library will make your life easier with ReNFT.

What is ReNFT?

- lend your ERC721 NFTs
- lend your ERC1155 NFTs
- lend combinations of ERC721 and ERC1155
- lend different amount of ERC1155, along with ERC721 all in one transaction
- gas optimised. Single lend is a single storage slot
- rent the NFTs
- claim collateral if your NFT is not returned in time
- return the NFT before the due date
- automatically re-lends your NFT after it is being returned

This sdk will ease out your journey with ReNFT. Among other things it handles

- price packing of collateral and rent prices
- correctly calling the contract to take advantage of the gas savings

![npm](https://img.shields.io/npm/v/@renft/sdk?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@renft/sdk?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@renft/sdk?style=for-the-badge)
![npm](https://img.shields.io/npm/dm/@renft/sdk?style=for-the-badge)

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

const main = async () => {
  const renft = new ReNFT(wallet);

  // address of the nft contract you are lending
  const TEST_E721_ADDR = ['0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'];
  // tokenID of the NFT you are lending
  const TEST_E721_TOKENID = ['1'];
  // in the case of 721 this is ignored, since it will always be 1. However, very useful for semi-fungible 1155s
  const lendAmount = [1];
  // maximum number of days anyone will be able to rent your NFT for
  const maxRentDuration = [1];
  // in the scale of the payment token. This means 1.1 WETH per day payment to rent the NFT out
  const dailyRentPrice = [1.1];
  // if the renter does not return your NFT, this is how much you will get back, i.e. 2.2 WETH
  const nftPrice = [2.2];
  const paymentToken = [PaymentToken.WETH];

  const txn = await renft.lend(
    TEST_E721_ADDR,
    TEST_E721_TOKENID,
    lendAmount,
    maxRentDuration,
    dailyRentPrice,
    nftPrice,
    paymentToken
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
