import { BigNumber, providers, Wallet } from 'ethers';
import { ReNFT, PaymentToken } from './index';

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new providers.JsonRpcProvider("<your provider uri>");
const privKey = "<privateKey>";
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