import { Contract, ContractTransaction } from '@ethersproject/contracts';

import {
  UpFrontRentFee,
  WhoopiV0LendFunction,
  WhoopiV0PayFunction,
  WhoopiV0RentFunction,
  WhoopiV0StopLendingFunction,
  WhoopiV0StopRentFunction,
} from './types';

export const createWhoopiV0LendThunk = (
  contract: Contract,
): WhoopiV0LendFunction => async (
  nftAddress: string,
  tokenId: string[],
  upfrontRentFees: readonly UpFrontRentFee[],
  revShareBeneficiaries: string[][],
  revSharePortions: number[][],
  maxRentDurations: number[],
  allowedRenters?: string[][],
  options?: any
): Promise<ContractTransaction> => {
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
  return await contract.lend(
    [nftAddress, tokenId, Array(tokenId.length).fill('0')],
    upfrontRentFees.map(({value}) => value),
    allowRenters,
    revShares,
    maxRentDurations,
    upfrontRentFees.map(({paymentToken}) => paymentToken),
    options ?? []
  );
};

export const createWhoopiV0RentThunk = (
  contract: Contract
): WhoopiV0RentFunction => async (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  rentDurations: number[],
  options?: any
): Promise<ContractTransaction> => {
  return await contract.rent(
    [nftAddress, tokenId, lendingId],
    rentDurations,
    options ?? []
  );
};

export const createWhoopiV0StopRentThunk = (
  contract: Contract
): WhoopiV0StopRentFunction => async (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  options?: any
) => {
  return await contract.stopRent(nftAddress, tokenId, lendingId, options ?? []);
};

export const createWhoopiV0StopLendingThunk = (
  contract: Contract
): WhoopiV0StopLendingFunction => async (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  options?: any
): Promise<ContractTransaction> => {
  return await contract.stopLend(
    [nftAddress, tokenId, lendingId],
    options ?? []
  );
};

export const createWhoopiV0PayThunk = (
  contract: Contract
): WhoopiV0PayFunction => async (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  renterAddress: string[],
  amountToPay: string[],
  options?: any
): Promise<ContractTransaction> => {
  return await contract.pay(
    [nftAddress, tokenId, lendingId],
    renterAddress,
    amountToPay,
    options ?? []
  );
};
