import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { WhoopiAvalancheAddress } from '../consts';
import IWhoopi from './interfaces/iwhoopi';
import WhoopiAbi from '../abi/whoopi.abi';
import { PaymentToken, RenftContracts } from '../types';
import { toScaledAmount } from '../utils';

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
    tokenId: string[],
    upfrontRentFees: string[],
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
      [nftAddress, tokenId, Array(tokenId.length).fill('0')],
      upfrontRentFees.map((x, i) =>
        toScaledAmount(x, RenftContracts.WHOOPI_AVALANCHE, paymentTokens[i])
      ) ?? [],
      allowRenters,
      revShares,
      maxRentDurations,
      paymentTokens,
      options ?? []
    );
  }

  async rent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.rent(
      [nftAddress, tokenId, lendingId],
      rentDurations,
      options ?? []
    );
  }

  // This is only callable by reNFT bot. This cannot be used
  // on the front-end side.
  async stopRent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.stopRent(
      nftAddress,
      tokenId,
      lendingId,
      options ?? []
    );
  }

  async stopLending(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.stopLend(
      [nftAddress, tokenId, lendingId],
      options ?? []
    );
  }

  async pay(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    renterAddress: string[],
    amountToPay: string[],
    options?: any
  ): Promise<ContractTransaction> {
    return await this.contract.pay(
      [nftAddress, tokenId, lendingId],
      renterAddress,
      amountToPay,
      options ?? []
    );
  }
}
