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

The below is a simple example of lending an ERC721, note that amount is ignored, you will always lend **1** qty of ERC721 tokenID. This is not the case for ERC1155.

With our protocol, you can also lend ERC1155 in multiple amounts! Moreover, it does not matter in what order you supply the inputs to our lend function, it will call the contract in a way that will save you as much gas as possible. This means a single call per ERC1155 group, moreover, the tokenIDs will be ordered in ascending order.

```javascript
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { BigNumber } from '@ethersproject/bignumber';
import { ReNFT, PaymentToken } from '@renft/sdk';

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new JsonRpcProvider('<your provider uri>');
const privKey = '<privateKey>';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

const main = async () => {
  const renft = new ReNFT(wallet);

  const E721_ADDR = ['0xCDf60B46Fa88e74DE7e1e613325E386BFe8609ad'];
  const E721_TOKENID = [BigNumber.from('3')];
  const lendAmount = [1];
  const maxRentDuration = [1];
  const dailyRentPrice = [1.1];
  const nftPrice = [2.2];
  const paymentToken = [PaymentToken.WETH];

  const txn = await renft.lend(
    E721_ADDR,
    E721_TOKENID,
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

For more usage examples, see `test/utils.test.ts`

## Repo references

For v1 collateral free contract code, see [here](https://github.com/re-nft/registry).

For v1 collateral contract code, see [here](https://github.com/re-nft/contracts).

## Dapp name glossary

| Name          |        App         |
| ------------- | :----------------: |
| **Azrael**    |   v1 collateral    |
| **Sylvester** | v1 collateral free |
| **Scar**      |   v2 collateral    |
| **Meowth**    | v2 collateral free |
| **Garfield**  |     v1 Solana      |
