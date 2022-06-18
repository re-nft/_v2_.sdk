const { JsonRpcProvider } = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const { BigNumber } = require('@ethersproject/bignumber');
const { Whoopi, PaymentToken } = require('../dist/index');

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new JsonRpcProvider('<your provider uri>');
const privKey = '<privateKey>';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

const main = async () => {
  // collateral solution
  // const renft = new Azrael(wallet);
  // * for collateral free (import Sylvester from index):
  // const renft = new Sylvester(wallet);
  const whoopi = new Whoopi(wallet, "0xBBda1DDeAd65E780b4330F771801011C995fa02E")

  // TODO: approve spending of nftAddress

  // castle crush nft address
  const nftAddress = [
    "0xeA4E79F0a40A9A468a5159499b738dc6b1332447",
    "0xeA4E79F0a40A9A468a5159499b738dc6b1332447"
  ];
  const tokenId = [BigNumber.from('3')];

  const upfrontRentFee = [1.1, 0];
  const paymentToken = [PaymentToken.USDC, PaymentToken.SENTINEL];
  
  const revShareBeneficiaries = [
    ["0x000000045232fe75A3C7db3e5B03B0Ab6166F425", "0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE"],
    ["0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE", "0xeA4E79F0a40A9A468a5159499b738dc6b1332447"]
  ];
  const revSharePortions = [
    [50, 50],
    [90, 10]
  ];

  const maxRentDuration = [1, 2];

  const txn = await renft.lend(
    nftAddress,
    tokenId,
    upfrontRentFee,
    revShareBeneficiaries,
    revSharePortions,
    maxRentDuration,
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
