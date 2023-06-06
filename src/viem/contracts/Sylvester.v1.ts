import { NFTStandard, packPrice, PaymentToken, prepareBatch } from '../../core';
import { Executor } from '../executor';
import SylvesterV0SDK from './Sylvester.v0';

export default class SylvesterV1SDK extends SylvesterV0SDK {
  async lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[],
    willAutoRenew: boolean[],
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
      willAutoRenew: willAutoRenew.map(x => (x ? 1 : 0)),
    });
    return this.exec('lend', [
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.paymentToken,
      args.willAutoRenew,
      options ?? [],
    ]);
  }
}
