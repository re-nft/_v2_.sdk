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
    nftAddress: string,
    tokenId: BigNumber[],
    upfrontRentFees: number[],
    revShareBeneficiaries: string[][],
    revSharePortions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][],
    options?: any
  ): Promise<ContractTransaction> {
    let revShares = [];
    for (let i = 0; i < revShareBeneficiaries.length; i++) {
      revShares.push([revShareBeneficiaries[i], revSharePortions[i]]);
    }
    let allowRenters = [];
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
    return await this.contract.lend(
      [
        String(nftAddress),
        tokenId.map(x => BigNumber.from(x)),
        Array(nftAddress.length).fill(BigNumber.from('0')),
      ],
      upfrontRentFees.map(x => Number(x)) ?? [],
      allowRenters,
      revShares,
      maxRentDurations.map(x => Number(x)),
      paymentTokens,
      options ?? []
    );
  }

  async rent(
    nftAddress: string,
    tokenId: BigNumber[],
    lendingId: BigNumber[],
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.rent(
      [
        String(nftAddress),
        tokenId.map(x => BigNumber.from(x)),
        lendingId.map(x => BigNumber.from(x)),
      ],
      rentDurations.map(x => Number(x)),
      options ?? []
    );
  }

  // This is only callable by reNFT bot. This cannot be used
  // on the front-end side.
  async stopRent(
    nftAddress: string,
    tokenId: BigNumber[],
    lendingId: BigNumber[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.stopRent(
      String(nftAddress),
      tokenId.map(id => BigNumber.from(id)),
      lendingId.map(x => BigNumber.from(x)),
      options ?? []
    );
  }

  async stopLending(
    nftAddress: string,
    tokenId: BigNumber[],
    lendingId: BigNumber[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.stopLend(
      String(nftAddress),
      tokenId.map(id => BigNumber.from(id)),
      lendingId.map(x => BigNumber.from(x)),
      options ?? []
    );
  }

  async pay(
    nftAddress: string,
    tokenId: BigNumber[],
    lendingId: BigNumber[],
    renterAddress: string[],
    amountToPay: number[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.pay(
      String(nftAddress),
      tokenId.map(id => BigNumber.from(id)),
      lendingId.map(x => BigNumber.from(x)),
      renterAddress.map(x => String(x).toLowerCase()),
      amountToPay.map(x => Number(x)),
      options ?? []
    );
  }
}
