#!/usr/bin/env node
const { BigNumber, providers, Wallet, Contract } = require('ethers');
// * you need to run yarn build to pull these
const { ReNFT, RENFT_ADDRESS, PaymentToken } = require('./dist/index');

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new providers.JsonRpcProvider("<provider uri>");
const privKey = "<private key>";
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
      tokenIds: E721_TOKENID
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
