import {
  PaymentToken,
  RenftContractType,
  RenftContractVersions,
  toWhoopiScaledAmount,
} from '../../core';
import { Executor, SDK } from '../base';

export default class WhoopiV0SDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> extends SDK<ContractType, ContractVersion> {
  async lend(
    nftAddress: string,
    tokenId: string[],
    upfrontRentFees: string[],
    revShareBeneficiaries: string[][],
    revSharePortions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][],
    options?: any
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
      upfrontRentFees?.map((x, i) =>
        toWhoopiScaledAmount(x, this.network, paymentTokens[i])
      ) ?? [],
      allowRenters,
      revShares,
      maxRentDurations,
      paymentTokens,
      options ?? [],
    ]);
  }

  async rent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    rentDurations: number[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    return this.exec('rent', [
      [nftAddress, tokenId, lendingId],
      rentDurations,
      options ?? [],
    ]);
  }

  async stopRent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    return this.exec('stopRent', [
      nftAddress,
      tokenId,
      lendingId,
      options ?? [],
    ]);
  }

  async stopLend(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    return this.exec('stopLend', [
      [nftAddress, tokenId, lendingId],
      options ?? [],
    ]);
  }

  async pay(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    renterAddress: string[],
    amountToPay: string[],
    options?: any
  ): Promise<ReturnType<Executor>> {
    return this.exec('pay', [
      [nftAddress, tokenId, lendingId],
      renterAddress,
      amountToPay,
      options ?? [],
    ]);
  }
}
