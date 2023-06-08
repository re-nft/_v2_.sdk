import { parseUnits } from 'viem/utils/';

import { NETWORK_RESOLVERS } from '../../core';
import {
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  PaymentToken,
  RenftContractType,
  RenftContractVersions,
} from '../../core';
import { Executor, SDK, SDKInterface } from '../base';

export default class WhoopiV0SDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> extends SDK<ContractType, ContractVersion> {
  protected supportedDeployments = [
    DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
    DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  ];

  constructor(args: SDKInterface<ContractType, ContractVersion>) {
    super(args);
    super.validate(this.supportedDeployments);
  }

  async lend(
    nftAddress: string,
    tokenId: string[],
    upfrontRentFees: string[],
    revShareBeneficiaries: string[][],
    revSharePortions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][]
  ): Promise<ReturnType<Executor>> {
    const revShares = [];

    for (let i = 0; i < revShareBeneficiaries.length; i++) {
      revShares.push([revShareBeneficiaries[i], revSharePortions[i]]);
    }

    const allowRenters = [];

    if (allowedRenters) {
      for (let i = 0; i < allowedRenters.length; i++) {
        allowRenters.push([allowedRenters[i]]);
      }
    } else {
      for (let i = 0; i < tokenId.length; i++) {
        // outer array is for the AllowedRenters struct,
        // and the inner is for its contents: allowedRenters
        // ! we need this layering because graphprotocol cannot
        // ! generate types for 2d arrays. So you have to wrap
        // ! the outer array into a struct.
        allowRenters.push([[]]);
      }
    }

    return this.exec('lend', [
      [nftAddress, tokenId, Array(tokenId.length).fill('0')],
      upfrontRentFees?.map((fee, i) => {
        const scale = NETWORK_RESOLVERS[this.network][paymentTokens[i]].scale;
        // @ts-ignore something about tsdx is messing this up
        return parseUnits(fee, scale);
      }) ?? [],
      allowRenters,
      revShares,
      maxRentDurations,
      paymentTokens,
    ]);
  }

  async rent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    rentDurations: number[]
  ): Promise<ReturnType<Executor>> {
    return this.exec('rent', [[nftAddress, tokenId, lendingId], rentDurations]);
  }

  async stopRent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[]
  ): Promise<ReturnType<Executor>> {
    return this.exec('stopRent', [nftAddress, tokenId, lendingId]);
  }

  async stopLend(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[]
  ): Promise<ReturnType<Executor>> {
    return this.exec('stopLend', [[nftAddress, tokenId, lendingId]]);
  }

  async pay(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    renterAddress: string[],
    amountToPay: string[]
  ): Promise<ReturnType<Executor>> {
    return this.exec('pay', [
      [nftAddress, tokenId, lendingId],
      renterAddress,
      amountToPay,
    ]);
  }
}
