import { packPrice, PaymentToken, prepareBatch } from '../../core';
import { Executor, SDK } from '../executor';

export default class AzrealV0SDK extends SDK {
  async lend(
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
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
      options ?? [],
    ]);
  }

  async rent(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    options?: any
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
      options ?? [],
    ]);
  }

  async returnIt(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
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
      options ?? [],
    ]);
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
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
      options ?? [],
    ]);
  }

  async stopLending(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
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
      options ?? [],
    ]);
  }
}
