import {
  NFTStandard,
  packPrice,
  PaymentToken,
  prepareBatch,
  RenftContractType,
  RenftContractVersions,
} from '../../core';
import { Executor, SDK } from '../base';

export default class SylvesterBaseSDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> extends SDK<ContractType, ContractVersion> {
  async lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      amount: amount.map(Number),
      dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
      maxRentDuration: maxRentDuration.map(Number),
      nftAddress: nftAddress.map(String),
      nftStandard,
      paymentToken,
      tokenID: tokenID.map(String),
    });
    return this.exec('lend', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.paymentToken,
    ]);
  }

  async rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    rentAmount: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      nftStandard: nftStandard.map(Number),
      rentAmount: rentAmount.map(String),
      rentDuration: rentDuration.map(Number),
      tokenID: tokenID.map(String),
    });
    return this.exec('rent', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentDuration,
      args.rentAmount,
    ]);
  }

  async stopRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      nftStandard: nftStandard.map(Number),
      rentingID: rentingID.map(String),
      tokenID: tokenID.map(String),
    });
    return this.exec('stopRent', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID,
    ]);
  }

  async claimRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      nftStandard: nftStandard.map(Number),
      rentingID: rentingID.map(String),
      tokenID: tokenID.map(String),
    });
    return this.exec('claimRent', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID,
    ]);
  }

  async stopLend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[]
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      nftStandard: nftStandard.map(Number),
      tokenID: tokenID.map(String),
    });
    return this.exec('stopLend', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
    ]);
  }
}
