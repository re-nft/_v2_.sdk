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

export enum NFTStandard {
  E721,
  E1155
}

export interface IReNFT {
  lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendAmount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction>;

  rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDuration: number[],
    rentAmount: BigNumber[]
  ): Promise<ContractTransaction>;

  stopRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction>;

  claimRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction>;

  stopLend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>;
}
