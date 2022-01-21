import { BigNumber, ContractTransaction } from 'ethers';

export enum PaymentToken {
  SENTINEL, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH,
  DAI,
  USDC,
  USDT,
  TUSD,
  RENT,
}

export type Nfts = {
  nft: string[]; // INFTContract
  tokenIds: BigNumber[]; // uint256
  lendingIds?: BigNumber[]; // uint256
}

export type Price = {
  whole: number | string;   // uint24
  decimal: number | string; // uint8
}

// todo: add editLend
// todo: add softDefault
export interface IReNFT {

  lend(
    nfts: Nfts,
    lendAmounts: number[],
    maxRentDurations: number[],
    dailyRentPrices: Price[],
    collaterals: Price[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction>;

  rent(
    nfts: Nfts,
    rentDurations: number[]
  ): Promise<ContractTransaction>;

  returnIt(
    nfts: Nfts
  ): Promise<ContractTransaction>;

  claimCollateral(
    nfts: Nfts
  ): Promise<ContractTransaction>;

  stopLending(
    nfts: Nfts
  ): Promise<ContractTransaction>;
}
