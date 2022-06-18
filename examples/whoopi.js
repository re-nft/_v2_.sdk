const { Contract } = require('@ethersproject/contracts');
const { JsonRpcProvider } = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const { Whoopi, PaymentToken } = require('../dist/index');

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
  const whoopiAddress = "0xBBda1DDeAd65E780b4330F771801011C995fa02E";
  const whoopi = new Whoopi(wallet, whoopiAddress);

  const castleCrush = new Contract(
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
  txn = await castleCrush.setApprovalForAll(whoopiAddress, true)
  receipt = await txn.wait();

  // castle crush nft address
  const nftAddress = "0xeA4E79F0a40A9A468a5159499b738dc6b1332447";
  const tokenId = [230, 220];

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
  const revSharePortions = [
    [50, 50],
    [90, 10]
  ];

  const maxRentDuration = [1, 2];

  txn = await whoopi.lend(
    nftAddress,
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

  return receipt;
};

main()
  .then(receipt => {
    console.log(receipt);
  })
  .catch(e => {
    console.warn(e);
  });
