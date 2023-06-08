import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  packPrice,
  PaymentToken,
  prepareBatch,
  RenftContractType,
  RenftContractVersions,
} from '../../core';
import { Executor, SDK, SDKInterface } from '../base';

export default class AzraelV0SDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> extends SDK<ContractType, ContractVersion> {
  protected supportedDeployments = [DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0];

  constructor(args: SDKInterface<ContractType, ContractVersion>) {
    super(args);
    super.validate(this.supportedDeployments);
  }

  async lend(
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      amount: amount.map(Number),
      dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
      maxRentDuration: maxRentDuration.map(Number),
      nftAddress: nftAddress.map(String),
      nftPrice: nftPrice.map(x => packPrice(Number(x).toString())),
      paymentToken,
      tokenID: tokenID.map(String),
    });
    return this.exec('lend', [
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.nftPrice,
      args.paymentToken,
    ]);
  }

  async rent(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      rentDuration: rentDuration.map(Number),
      tokenID: tokenID.map(String),
    });
    return this.exec('rent', [
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentDuration,
    ]);
  }

  async returnIt(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
    });
    return this.exec('returnIt', [
      args.nftAddress,
      args.tokenID,
      args.lendingID,
    ]);
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
    });
    return this.exec('claimCollateral', [
      args.nftAddress,
      args.tokenID,
      args.lendingID,
    ]);
  }

  async stopLending(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
    });
    return this.exec('stopLending', [
      args.nftAddress,
      args.tokenID,
      args.lendingID,
    ]);
  }
}
