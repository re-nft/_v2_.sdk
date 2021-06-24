import { BigNumber, ContractTransaction } from "ethers";

export enum PaymentToken {
  SENTINEL, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH,
  DAI,
  USDC,
  USDT,
  TUSD,
  RENT
}

export interface IReNFT {
  lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction>

  rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    lendingID: BigNumber[],
    rentDuration: number[]
  ): Promise<ContractTransaction>

  returnIt(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>

  claimCollateral(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>

  stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>
}