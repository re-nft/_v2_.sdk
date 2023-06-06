import { NFTStandard, packPrice, PaymentToken, prepareBatch } from '../../core';
import { Executor, SDK } from '../executor';

export default class SylvesterV0SDK extends SDK {
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
      options ?? [],
    ]);
  }

  async rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    rentAmount: string[],
    options?: any
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
      options ?? [],
    ]);
  }

  async stopRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
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
      options ?? [],
    ]);
  }

  async claimRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      nftStandard: nftStandard.map(Number),
      rentingID: rentingID.map(String),
      tokenID: tokenID.map(String),
    });
    return await this.exec('claimRent', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID,
      options ?? [],
    ]);
  }

  async stopLend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    const args = prepareBatch({
      lendingID: lendingID.map(String),
      nftAddress: nftAddress.map(String),
      nftStandard: nftStandard.map(Number),
      tokenID: tokenID.map(String),
    });
    return await this.exec('stopLend', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      options ?? [],
    ]);
  }
}
