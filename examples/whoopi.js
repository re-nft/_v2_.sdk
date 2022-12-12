const { JsonRpcProvider } = require('@ethersproject/providers');
const { parseFixed } = require('@ethersproject/bignumber');
const { Wallet } = require('@ethersproject/wallet');
const {
  PaymentToken,
  NETWORK_RESOLVERS,
  getVersionedContractInterfaceForDeployment,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
} = require('@renft/sdk');

// If you ever have issues with sending a transaction:
// use { gasLimit: 1000000 } options when you send a transaction.
// This will make sure to send a transaction even if it is
// expected to fail. Next, take transaction's receipt hash
// and use tenderly to debug: https://tenderly.co/

// * if you need to use mnemonic instead of a private key
// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
// * avalanche fuji rpc: https://api.avax-test.network/ext/bc/C/rpc
// * avalanche main rpc: https://api.avax.network/ext/bc/C/rpc
const provider = new JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
const privKey = '';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

let txn;
let receipt;
let tokenId;
let lendingId;


// Wildlife Castle Crush FUJI examples
const main = async () => {
  const castleCrushNftAddress = "0xeA4E79F0a40A9A468a5159499b738dc6b1332447";

  const deployment = DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0;

  const whoopi = getVersionedContractInterfaceForDeployment({
    deployment,
    signer: wallet,
  });

  // ! depending on what you want to do, comment out a section
  // ! for example, if you want to just lend, comment out
  // ! the other sections

  // ---------------- LENDING ----------------------

  // * you only need to run this once (as a lender)
  // * if, however, you have ran it more than once,
  // * it does not have any side-effect, it's a no-op
  // await approveNftForAll(castleCrushNftAddress, wallet, whoopiAddress);

  tokenId = ["210", "200"];
  // ! Note that if allowedRenters is empty, you must set
  // ! upfrontRentFee to a non zero value.
  const upfrontRentFee = [
    parseFixed("1", NETWORK_RESOLVERS[deployment.network.type][PaymentToken.USDC].scale).toString(),
    parseFixed("1", NETWORK_RESOLVERS[deployment.network.type][PaymentToken.USDC].scale).toString()
  ];
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
  // ! gets eventually assigned to the renter.
  const revSharePortions = [
    [50, 40], // 10% is how much the renter will get on this lending
    [90, 5] // 5% is how much ther renter will get on this lending
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
  // await mintPaymentToken(FUJI_USDC, wallet);
  // await approvePaymentToken(FUJI_USDC, wallet, whoopiAddress, "1000000000");

  // castle crush nft address
  tokenId = [210, 200];
  lendingId = [3, 4];
  const rentingDuration = [1, 2];

  txn = await whoopi.rent(
    castleCrushNftAddress,
    tokenId,
    lendingId,
    rentingDuration
    // { gasLimit: 1000000 }
  );
  receipt = await txn.wait();

  // -------------------- STOPPING LENDING ----------------------

  tokenId = [210, 200];
  lendingId = [3, 4];

  txn = await whoopi.stopLending(
    castleCrushNftAddress,
    tokenId,
    lendingId,
    // { gasLimit: 1000000 }
  )
  receipt = await txn.wait();

  // -------------------- PAYING REWARDS ----------------------

  // * you only need to run this once (as a reward payer)
  // * to approve once, consider setting the amount to max uint256
  // * "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  // await approvePaymentToken(FUJI_USDC, wallet, whoopiAddress, "1000000000");

  tokenId = [210, 200];
  lendingId = [3, 4];
  const renterAddress = ["0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE", "0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE"];
  const amountToPay = [
    parseFixed("1", NETWORK_RESOLVERS[deployment.network.type][PaymentToken.USDC].scale).toString(),
    parseFixed("1", NETWORK_RESOLVERS[deployment.network.type][PaymentToken.USDC].scale).toString()
  ];

  txn = await whoopi.pay(
    castleCrushNftAddress,
    tokenId,
    lendingId,
    renterAddress,
    amountToPay,
    // { gasLimit: 1000000 }
  );
  receipt = await txn.wait();

  return receipt;
};

main()
  .then(receipt => {
    console.log(receipt);
  })
  .catch(e => {
    console.warn(e);
  });
