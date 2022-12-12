const { JsonRpcProvider } = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const { BigNumber } = require('@ethersproject/bignumber');
const {
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  PaymentToken,
  getVersionedContractInterfaceForDeployment,
} = require('@renft/sdk');

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new JsonRpcProvider('<your provider uri>');
const privKey = '<privateKey>';
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

let txn;
let receipt;


const main = async () => {

  // ---------------- LENDING ----------------------

  // collateral solution
  // const renft = new Azrael(wallet);
  // * for collateral free (import Sylvester from index):
  const renft = getVersionedContractInterfaceForDeployment({
    deployment: DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
    signer: wallet,
  });

  const E721_ADDR = ['0xCDf60B46Fa88e74DE7e1e613325E386BFe8609ad'];
  const E721_TOKENID = [BigNumber.from('3')];
  const lendAmount = [1];
  const maxRentDuration = [1];
  const dailyRentPrice = [1.1];
  const nftPrice = [2.2];
  const paymentToken = [PaymentToken.WETH];

  const nftStandard = [1, 1];
  const nftAddress = ['0x495f947276749ce646f68ac8c248420045cb7b5e', '0xd07dc4262bcdbf85190c01c996b4c06a461d2430'];
  const tokenID = ['65385238396461245548909757441444140644847314737463192205847680215270719225857', '73166'];
  const lendingID = [133, 132];
  const rentDuration = [1, 1];
  const rentAmount = [1, 1];

  // Azrael Lend Transaction
  txn = await renft.lend(
    E721_ADDR,
    E721_TOKENID,
    lendAmount,
    maxRentDuration,
    dailyRentPrice,
    nftPrice,
    paymentToken
  );
  receipt = await txn.wait();

  // -------------------- RENTING ----------------------

  // Sylvester Rent Transaction
  txn = await renft.rent(
    nftStandard,
    nftAddress,
    tokenID,
    lendingID,
    rentDuration,
    rentAmount
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
