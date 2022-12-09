import {Contract, ContractTransaction} from '@ethersproject/contracts';

import {PaymentToken} from '../../types';
import {packPrice, prepareBatch} from '../../utils';

import {
    AzraelV0ClaimCollateralFunction,
    AzraelV0LendFunction,
    AzraelV0RentFunction, AzraelV0ReturnItFunction, AzraelV0StopLendingFunction,
} from './types';

export const createAzraelV0LendThunk = (
  contract: Contract
): AzraelV0LendFunction => async (
  nftAddress: string[],
  tokenID: string[],
  amount: number[],
  maxRentDuration: number[],
  dailyRentPrice: number[],
  nftPrice: number[],
  paymentToken: PaymentToken[],
  options?: any,
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    nftAddress: nftAddress.map(String),
    tokenID: tokenID.map(String),
    amount: amount.map(Number),
    maxRentDuration: maxRentDuration.map(Number),
    dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
    nftPrice: nftPrice.map(x => packPrice(Number(x).toString())),
    paymentToken,
  });
  return await contract.lend(
    args.nftAddress,
    args.tokenID,
    args.amount,
    args.maxRentDuration,
    args.dailyRentPrice,
    args.nftPrice,
    args.paymentToken,
    options ?? []
  );
};

export const createAzraelV0RentThunk = (contract: Contract): AzraelV0RentFunction => async (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentDuration: number[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    nftAddress: nftAddress.map(String),
    tokenID: tokenID.map(String),
    lendingID: lendingID.map(String),
    rentDuration: rentDuration.map(Number),
  });
  return await contract.rent(
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    args.rentDuration,
    options ?? []
  );
};

export const createAzraelV0ReturnItThunk = (
  contract: Contract
): AzraelV0ReturnItFunction => async (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any,
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    nftAddress: nftAddress.map(String),
    tokenID: tokenID.map(String),
    lendingID: lendingID.map(String),
  });
  return await contract.returnIt(
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    options ?? []
  );
};

export const createAzraelV0ClaimCollateralThunk = (
  contract: Contract
): AzraelV0ClaimCollateralFunction => async (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any,
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    nftAddress: nftAddress.map(String),
    tokenID: tokenID.map(String),
    lendingID: lendingID.map(String),
  });
  return await contract.claimCollateral(
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    options ?? []
  );
};

export const createAzraelV0StopLendingThunk = (
  contract: Contract
): AzraelV0StopLendingFunction => async (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any
): Promise<ContractTransaction> => {
  const args = prepareBatch({
    nftAddress: nftAddress.map(String),
    tokenID: tokenID.map(String),
    lendingID: lendingID.map(String),
  });
  return await contract.stopLending(
    args.nftAddress,
    args.tokenID,
    args.lendingID,
    options ?? []
  );
};
