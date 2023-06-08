import {
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  NFTStandard,
  packPrice,
  PaymentToken,
  prepareBatch,
  RenftContractType,
  RenftContractVersions,
} from '../../core';
import { Executor, SDKInterface } from '../base';
import SylvesterBaseSDK from './Sylvester.base';

export default class SylvesterV1SDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> extends SylvesterBaseSDK<ContractType, ContractVersion> {
  protected supportedDeployments = [DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1];

  constructor(args: SDKInterface<ContractType, ContractVersion>) {
    super(args);
    super.validate(this.supportedDeployments);
  }

  async lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[],
    willAutoRenew: boolean[]
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
    ]);
  }
}
