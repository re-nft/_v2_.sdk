import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  getRenftContract,
  PaymentToken,
} from "@renft/sdk";

// const walletMnemonic = Wallet.fromMnemonic(`<your mnemonic>`);
const provider = new JsonRpcProvider("<your provider uri>");
const privKey = "<privateKey>";
let wallet = new Wallet(privKey);
wallet = wallet.connect(provider);

const main = async () => {
  const renft = getRenftContract({
    deployment: DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
    signer: wallet,
  });

  const nftAddress = ["0xCDf60B46Fa88e74DE7e1e613325E386BFe8609ad"];
  const tokenId = ["3"];
  const lendAmount = [1]; // for ERC721, this is ignored
  const maxRentDuration = [1]; // in days (can be returned earlier)
  const dailyRentPrice = [1.1]; // this will automatically scale
  const nftPrice = [2.2]; // this will automatically scale
  const paymentToken = [PaymentToken.WETH];

  const txn = await renft.lend(
    nftAddress,
    tokenId,
    lendAmount,
    maxRentDuration,
    dailyRentPrice,
    nftPrice,
    paymentToken,
  );

  const receipt = await txn.wait();
  return receipt;
};

main()
  .then((receipt) => {
    console.log(receipt);
  })
  .catch((e) => {
    console.warn(e);
  });
