import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from '@ethersproject/abstract-signer';

import { WhoopiAvalancheAddress } from '../consts';
import IWhoopi from './interfaces/iwhoopi';
import WhoopiAbi from '../abi/whoopi.abi';
import { PaymentToken } from '../types';

export class Whoopi implements IWhoopi {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer, _address?: string) {
    this.signer = _signer;
    this.contract = new Contract(
      _address ?? WhoopiAvalancheAddress,
      WhoopiAbi.abi,
      this.signer
    );
  }

  // If the user hasn't selected any value for upfront fee for a lending,
  // then set it to zero on the front-end.
  async lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    upfrontRentFees: number[],
    revShareBeneficiaries: string[][],
    revSharePortions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.lend(
      [
        nftAddress.map(x => String(x)),
        tokenID.map(x => BigNumber.from(x)),
        Array(nftAddress.length).fill(BigNumber.from('0')),
      ],
      upfrontRentFees.map(x => Number(x)) ?? [],
      allowedRenters?.map(x => x.map(y => String(y))) ?? [
        Array(nftAddress.length).fill([]),
      ],
      [
        revShareBeneficiaries.map(x => x.map(y => String(y))),
        revSharePortions.map(x => x.map(y => Number(y))),
      ],
      maxRentDurations.map(x => Number(x)),
      paymentTokens,
      options ?? []
    );
  }

  async rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.rent(
      nftAddress.map(x => String(x)),
      tokenID.map(x => BigNumber.from(x)),
      lendingID.map(x => BigNumber.from(x)),
      rentDurations.map(x => Number(x)),
      options ?? []
    );
  }

  async stopRent(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.stopRent(
      nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID.map(id => BigNumber.from(id)),
      lendingID.map(x => BigNumber.from(x)),
      options ?? []
    );
  }

  async stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.stopLend(
      nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID.map(id => BigNumber.from(id)),
      lendingID.map(x => BigNumber.from(x)),
      options ?? []
    );
  }

  async pay(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    renterAddress: string[],
    amountToPay: number[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.pay(
      nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID.map(id => BigNumber.from(id)),
      lendingID.map(x => BigNumber.from(x)),
      renterAddress.map(x => String(x).toLowerCase()),
      amountToPay.map(x => Number(x)),
      options ?? []
    );
  }
}
