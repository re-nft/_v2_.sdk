import { Contract, ContractTransaction } from '@ethersproject/contracts';

import {
  NFTStandard,
  packPrice,
  PaymentToken,
  prepareBatch,
} from '../../../core';
import {
  SylvesterV0ClaimCollateralFunction,
  SylvesterV0LendFunction,
  SylvesterV0RentFunction,
  SylvesterV0ReturnItFunction,
  SylvesterV0StopLendingFunction,
} from './types';

export const createSylvesterV0LendThunk = (
  contract: Contract
): SylvesterV0LendFunction => async (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  amount: number[],
  maxRentDuration: number[],
  dailyRentPrice: number[],
  paymentToken: PaymentToken[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    amount: amount.map(Number),
    dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
    maxRentDuration: maxRentDuration.map(Number),
    nftAddress: nftAddress.map(String),
    nftStandard,
    paymentToken,
    tokenID: tokenID.map(String),
  });
  return await contract.lend(
    args.nftStandard,
    args.nftAddress,
    args.tokenID,
    args.amount,
    args.maxRentDuration,
    args.dailyRentPrice,
    args.paymentToken,
    options ?? []
  );
};

export const createSylvesterV1LendThunk = (
  contract: Contract
): SylvesterV0LendFunction => async (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  amount: number[],
  maxRentDuration: number[],
  dailyRentPrice: number[],
  paymentToken: PaymentToken[],
  willAutoRenew: boolean[],
  options?: any
): Promise<ContractTransaction> => {
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
  return await contract.lend(
    args.nftStandard,
    args.nftAddress,
    args.tokenID,
    args.amount,
    args.maxRentDuration,
    args.dailyRentPrice,
    args.paymentToken,
    args.willAutoRenew,
    options ?? []
  );
};

export const createSylvesterV0RentThunk = (
  contract: Contract
): SylvesterV0RentFunction => async (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentDuration: number[],
  rentAmount: string[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    lendingID: lendingID.map(String),
    nftAddress: nftAddress.map(String),
    nftStandard: nftStandard.map(Number),
    rentAmount: rentAmount.map(String),
    rentDuration: rentDuration.map(Number),
    tokenID: tokenID.map(String),
  });
  return await contract.rent(
    args.nftStandard,
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    args.rentDuration,
    args.rentAmount,
    options ?? []
  );
};

export const createSylvesterV0ReturnItThunk = (
  contract: Contract
): SylvesterV0ReturnItFunction => async (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentingID: string[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    lendingID: lendingID.map(String),
    nftAddress: nftAddress.map(String),
    nftStandard: nftStandard.map(Number),
    rentingID: rentingID.map(String),
    tokenID: tokenID.map(String),
  });
  return await contract.stopRent(
    args.nftStandard,
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    args.rentingID,
    options ?? []
  );
};

export const createSylvesterV0ClaimCollateralThunk = (
  contract: Contract
): SylvesterV0ClaimCollateralFunction => async (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentingID: string[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    lendingID: lendingID.map(String),
    nftAddress: nftAddress.map(String),
    nftStandard: nftStandard.map(Number),
    rentingID: rentingID.map(String),
    tokenID: tokenID.map(String),
  });
  return await contract.claimRent(
    args.nftStandard,
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    args.rentingID,
    options ?? []
  );
};

export const createSylvesterV0StopLendingThunk = (
  contract: Contract
): SylvesterV0StopLendingFunction => async (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    lendingID: lendingID.map(String),
    nftAddress: nftAddress.map(String),
    nftStandard: nftStandard.map(Number),
    tokenID: tokenID.map(String),
  });
  return await contract.stopLend(
    args.nftStandard,
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    options ?? []
  );
};
