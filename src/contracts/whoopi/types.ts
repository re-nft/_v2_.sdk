import { ContractTransaction } from '@ethersproject/contracts';

// * Note that there is no RENT payment token on avalanche (as of 14th June 2022)
import { PaymentToken, WhoopiVersion } from '../../types';
import {BigNumber} from "@ethersproject/bignumber";

export type AbstractWhoopiFunctionInterface<
  LendFunction,
  RentFunction,
  StopRentFunction,
  StopLendingFunction,
  PayFunction
> = {
  readonly lend: LendFunction;
  readonly rent: RentFunction;
  readonly stopRent: StopRentFunction;
  readonly stopLending: StopLendingFunction;
  readonly pay: PayFunction;
};

export type UpFrontRentFee = {
  readonly value: BigNumber;
  readonly paymentToken: PaymentToken;
};

export type WhoopiV0LendFunction = (
  nftAddress: string,
  tokenId: string[],
  upfrontRentFees: readonly UpFrontRentFee[],
  revShareBeneficiaries: string[][],
  portions: number[][],
  maxRentDurations: number[],
  allowedRenters?: string[][],
  options?: any
) => Promise<ContractTransaction>;

export type WhoopiV0RentFunction = (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  rentDurations: number[],
  options?: any
) => Promise<ContractTransaction>;

export type WhoopiV0StopRentFunction = (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  options?: any
) => Promise<ContractTransaction>;

export type WhoopiV0StopLendingFunction = (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  options?: any
) => Promise<ContractTransaction>;

export type WhoopiV0PayFunction = (
  nftAddress: string,
  tokenId: string[],
  lendingId: string[],
  renterAddress: string[],
  amountToPay: string[],
  options?: any
) => Promise<ContractTransaction>;

export type WhoopiV0FunctionInterface = AbstractWhoopiFunctionInterface<
  WhoopiV0LendFunction,
  WhoopiV0RentFunction,
  WhoopiV0StopRentFunction,
  WhoopiV0StopLendingFunction,
  WhoopiV0PayFunction
>;

export type WhoopiInterfaceVersions = {
  readonly [WhoopiVersion.V0]: WhoopiV0FunctionInterface;
};
