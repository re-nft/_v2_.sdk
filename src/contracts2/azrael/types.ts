import {ContractTransaction} from '@ethersproject/contracts';

import {AzraelVersion, PaymentToken} from '../../types';

export interface AbstractAzraelFunctionInterface<
  LendFunction,
  RentFunction,
  ReturnItFunction,
  ClaimCollateralFunction,
  StopLendingFunction,
> {
  readonly lend: LendFunction;
  readonly rent: RentFunction;
  readonly returnIt: ReturnItFunction;
  readonly claimCollateral: ClaimCollateralFunction;
  readonly stopLending: StopLendingFunction;
};

export type AzraelV0LendFunction = (
  nftAddress: string[],
  tokenID: string[],
  amount: number[],
  maxRentDuration: number[],
  dailyRentPrice: number[],
  nftPrice: number[],
  paymentToken: PaymentToken[],
  options?: any,
) => Promise<ContractTransaction>;

export type AzraelV0RentFunction = (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentDuration: number[],
  options?: any
) => Promise<ContractTransaction>;

export type AzraelV0ReturnItFunction =(
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any
) => Promise<ContractTransaction>;

export type AzraelV0ClaimCollateralFunction = (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any
) => Promise<ContractTransaction>;

export type AzraelV0StopLendingFunction = (
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any
) => Promise<ContractTransaction>;

export type AzraelV0FunctionInterface = AbstractAzraelFunctionInterface<
  AzraelV0LendFunction,
  AzraelV0RentFunction,
  AzraelV0ReturnItFunction,
  AzraelV0ClaimCollateralFunction,
  AzraelV0StopLendingFunction
>;

export type AzraelInterfaceVersions = {
  readonly [AzraelVersion.V0]: AzraelV0FunctionInterface;
};
