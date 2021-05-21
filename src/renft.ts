import { providers, BigNumber, ContractTransaction, Contract } from "ethers";

import { IReNFT, PaymentToken } from "./types";
import { ReNFT as AbiReNFT } from "./abi";
import { prepareBatch } from "./utils";

export class ReNFT implements IReNFT {
  protected provider: providers.Provider;
  protected contract: Contract;

  constructor(_provider: providers.Provider) {
    this.provider = _provider;
    // * willf fail on the networks we haven't deployed to yet
    this.contract = new Contract('0x610178dA211FEF7D417bC0e6FeD39F05609AD788', AbiReNFT, this.provider);
  }

  async lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress,
      tokenID,
      is721,
      amount,
      maxRentDuration,
      dailyRentPrice,
      nftPrice,
      paymentToken
    });
    return await this.contract.lend(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.nftPrice,
      args.paymentToken
    )
  }

  async rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[],
    rentDuration: number[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress,
      tokenID,
      is721,
      amount: lentAmount,
      lendingID,
      rentDuration
    });
    return await this.contract.rent(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }

  async returnIt(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress,
      tokenID,
      is721,
      amount: lentAmount,
      lendingID
    });
    return await this.contract.returnIt(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress,
      tokenID,
      is721,
      amount: lentAmount,
      lendingID
    });
    return await this.contract.claimCollateral(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }

  async stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress,
      tokenID,
      is721,
      amount: lentAmount,
      lendingID
    });
    return await this.contract.stopLending(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }
}