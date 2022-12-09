import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { WhoopiAvalancheAddress } from '../consts';
import WhoopiAbi from '../abi/whoopi.abi';
import { PaymentToken } from '../types';
import {
  createWhoopiV0LendThunk,
  createWhoopiV0PayThunk,
  createWhoopiV0RentThunk,
  createWhoopiV0StopLendingThunk,
  createWhoopiV0StopRentThunk
} from '../contracts2/whoopi/utils';
import {WhoopiV0FunctionInterface} from '../contracts2/whoopi/types';

export class Whoopi implements WhoopiV0FunctionInterface {
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
  lend = (
    nftAddress: string,
    tokenId: string[],
    upfrontRentFees: string[],
    revShareBeneficiaries: string[][],
    revSharePortions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][],
    options?: any
  ): Promise<ContractTransaction> => createWhoopiV0LendThunk(this.contract)(
    nftAddress,
    tokenId,
    upfrontRentFees,
    revShareBeneficiaries,
    revSharePortions,
    maxRentDurations,
    paymentTokens,
    allowedRenters,
    options,
  );

  rent = (
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction> => createWhoopiV0RentThunk(this.contract)(
    nftAddress,
    tokenId,
    lendingId,
    rentDurations,
    options,
  );

  // This is only callable by reNFT bot. This cannot be used
  // on the front-end side.
  stopRent = (
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ContractTransaction> => createWhoopiV0StopRentThunk(this.contract)(
    nftAddress,
    tokenId,
    lendingId,
    options ?? []
  );

  stopLending = (
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ContractTransaction> => createWhoopiV0StopLendingThunk(this.contract)(
    nftAddress,
    tokenId,
    lendingId,
    options,
  );

  pay = (
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    renterAddress: string[],
    amountToPay: string[],
    options?: any
  ): Promise<ContractTransaction> => createWhoopiV0PayThunk(this.contract)(
    nftAddress,
    tokenId,
    lendingId,
    renterAddress,
    amountToPay,
    options,
  );
}
