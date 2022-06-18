const { JsonRpcProvider } = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const { Whoopi, PaymentToken } = require('../dist/index');
const { mintPaymentToken, approvePaymentToken, approveNftForAll, FUJI_USDC } = require('./utils/index');

// ! Ping Naz with your wallet address so that he can ask
// ! castle crush to mint you some Fuji NFTs.

// If you ever have issues with sending a transaction:
// use { gasLimit: 1000000 } options when you send a transaction.
// This will make sure to send a transaction even if it is
// expected to fail. Next, take transaction's receipt hash
// and use tenderly to debug: https://tenderly.co/

// avalanche fuji rpc: https://api.avax-test.network/ext/bc/C/rpc
// avalanche main rpc: https://api.avax.network/ext/bc/C/rpc


// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
const privKey = '';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

let txn;
let receipt;


const main = async () => {
  const castleCrushNftAddress = "0xeA4E79F0a40A9A468a5159499b738dc6b1332447";
  const whoopiAddress = "0xBBda1DDeAd65E780b4330F771801011C995fa02E";
  const whoopi = new Whoopi(wallet, whoopiAddress);

  // ! depending on what you want to do, comment out a section
  // ! for example, if you want to just lend, comment out
  // ! the other sections

  // ---------------- LENDING ----------------------

  // * you only need to run this once (as a lender)
  // so if you are re-running the script, comment this out
  //   await approveNftForAll(castleCrushNftAddress, wallet, whoopiAddress);

  const tokenId = [210, 200];
  // ! Note that if allowedRenters is empty, you must set
  // upfrontRentFee to a non zero value.
  // ! if you provide decimals, BigNumber will fail
  const upfrontRentFee = [1, 1];
  // ! you can't use SENTINEL as a payment token, even though
  // ! you don't want to set an upfront rent fee. Just use any
  // ! payment token in such a case.
  const paymentToken = [PaymentToken.USDC, PaymentToken.USDC];
  const revShareBeneficiaries = [
    ["0x000000045232fe75A3C7db3e5B03B0Ab6166F425", "0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE"],
    ["0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE", "0xeA4E79F0a40A9A468a5159499b738dc6b1332447"]
  ];
  // ! portions sum cannot be 100 here. At lend, we don't know who will rent,
  // ! and the renter is always a mandatory part in rev share. We are not setting
  // ! the renter here at lend time. Therefore, 100 - sum(portions) is what
  // ! gets eventually assigned to renter.
  const revSharePortions = [
    [50, 40],
    [90, 5]
  ];
  const maxRentDuration = [1, 2];

  txn = await whoopi.lend(
    castleCrushNftAddress,
    tokenId,
    upfrontRentFee,
    revShareBeneficiaries,
    revSharePortions,
    maxRentDuration,
    paymentToken,
    undefined,
    // ! uncomment this if it does not allow you to execute because it predicts that
    // ! the transaction will fail
    // { gasLimit: 1000000 }
  );
  receipt = await txn.wait();

  // -------------------- RENTING ----------------------

  // * you only need to run this once (as a renter)
  // so if you are re-runnig the script, comment this out
//   await mintPaymentToken(FUJI_USDC, wallet);
//   await approvePaymentToken(FUJI_USDC, wallet, whoopiAddress, "1000000000");

  // castle crush nft address
//   const tokenId = [210, 200];
//   const lendingId = [3, 4];
//   const rentingDuration = [1, 2];

//   txn = await whoopi.rent(
//     castleCrushNftAddress,
//     tokenId,
//     lendingId,
//     rentingDuration
//   );
//   receipt = await txn.wait();

  return receipt;
};

main()
  .then(receipt => {
    console.log(receipt);
  })
  .catch(e => {
    console.warn(e);
  });
