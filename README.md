![npm](https://img.shields.io/npm/v/@renft/sdk?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@renft/sdk?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@renft/sdk?style=for-the-badge)
![npm](https://img.shields.io/npm/dm/@renft/sdk?style=for-the-badge)

# Welcome to ReNFT SDK

Lend and rent any ERC721s and ERC1155s on Ethereum mainnet.

What is ReNFT?

- lend your ERC721 NFTs
- lend your ERC1155 NFTs
- lend combinations of ERC721 and ERC1155
- lend different amounts of ERC1155, along with ERC721 all in one transaction
- gas optimised. Single lend is a single storage slot
- rent the NFTs
- claim collateral if your NFT is not returned in time
- return the NFT before the due date
- automatically re-lends your NFT after it is being returned

Main objective of this sdk is to make it easy to call into the contract. Another important goal of this sdk is to sort the arguments in a way that will minimise the gas cost of execution. This is done by grouping the same NFTs together, such that the smart contract can effectively call the ERC1155s batch transfer function, if possible.

## Install

`yarn add @renft/sdk`

## Usage

The below is a simple example of lending an ERC721, note that amount is ignored, you will always lend **1** qty of ERC721 tokenID. This is not the case for ERC1155.

With our protocol, you can also lend ERC1155 in multiple amounts! Moreover, it does not matter in what order you supply the inputs to our lend function, it will call the contract in a way that will save you as much gas as possible. This means a single call per ERC1155 group, moreover, the tokenIDs will be ordered in ascending order.

```javascript
#!/usr/bin/env node
const { BigNumber, providers, Wallet, Contract } = require('ethers');
// * you need to run yarn build to pull these
const { ReNFT, RENFT_ADDRESS, PaymentToken } = require('./dist/index');

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new providers.JsonRpcProvider('<provider uri>');
const privKey = '<private key>';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

const main = async () => {
  const renft = new ReNFT(wallet);

  const E721_ADDR = ['<nft address>'];
  // ! this is only required if you have not yet approved the NFT
  // ! with the reNFT smart contract
  // const e721 = new Contract(E721_ADDR[0], [{ "constant":false, "inputs":[{ "internalType":"address", "name":"to", "type":"address" }, { "internalType":"bool", "name":"approved", "type":"bool" }], "name":"setApprovalForAll", "outputs":[], "payable":false, "stateMutability":"nonpayable", "type":"function" }], wallet);
  const E721_TOKENID = [BigNumber.from('<nft token id>')];
  const lendAmounts = [1];
  const maxRentDurations = [1];
  const dailyRentPrices = [{ whole: 0, decimal: 1 }]; // 0.01
  const collaterals = [{ whole: 0, decimal: 10 }]; // 0.10
  const paymentTokens = [PaymentToken.WETH];

  // approve (if not approved) the NFT with reNFT smart contract
  // let txn = await e721.setApprovalForAll(RENFT_ADDRESS, true);
  // let receipt = await txn.wait();

  // if the contract is not verified, gasEstimates may be inaccurate
  const txn = await renft.lend(
    {
      nft: E721_ADDR,
      tokenIds: E721_TOKENID,
    },
    lendAmounts,
    maxRentDurations,
    dailyRentPrices,
    collaterals,
    paymentTokens,
    { gasLimit: '1000000' }
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
