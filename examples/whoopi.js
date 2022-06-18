const { JsonRpcProvider } = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const { Whoopi, PaymentToken } = require('../dist/index');

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new JsonRpcProvider('<your provider uri>');
const privKey = '<privateKey>';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

const main = async () => {
  const whoopi = new Whoopi(wallet, "0xBBda1DDeAd65E780b4330F771801011C995fa02E")

  castleCrush = new Contract(
    "0xeA4E79F0a40A9A468a5159499b738dc6b1332447",
    [
        {
            "inputs": [
                {
                "internalType": "address",
                "name": "operator",
                "type": "address"
                },
                {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
    ],
    wallet
  );
  // * note that on the front-end side, you need only call this once
  // * to know if you should call it or not, there is a read function
  // * `isApprovedForAll(address,address)` that you need to call to figure
  // * out if the wallet is approved to be handled by the contract
  let txn = await castleCrush.setApprovalForAll(whoopi.address, true)
  let receipt = await txn.wait();

  // castle crush nft address
  const nftAddress = [
    "0xeA4E79F0a40A9A468a5159499b738dc6b1332447",
    "0xeA4E79F0a40A9A468a5159499b738dc6b1332447"
  ];
  const tokenId = [230, 220];

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

  txn = await renft.lend(
    nftAddress,
    tokenId,
    upfrontRentFee,
    revShareBeneficiaries,
    revSharePortions,
    maxRentDuration,
    paymentToken
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
