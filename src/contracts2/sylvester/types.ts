import { ContractTransaction } from '@ethersproject/contracts';

import {
  PaymentToken,
  NFTStandard,
  SylvesterVersion,
} from '../../types';

export type AbstractSylvesterFunctionInterface<
  LendFunction,
  RentFunction,
  ReturnItFunction,
  ClaimCollateralFunction,
  StopLendingFunction,
> = {
  readonly lend: LendFunction;
  readonly rent: RentFunction;
  readonly returnIt: ReturnItFunction;
  readonly claimCollateral: ClaimCollateralFunction /* aka claimRent */;
  readonly stopLending: StopLendingFunction;
};

export type SylvesterV0LendFunction = (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  amount: number[],
  maxRentDuration: number[],
  dailyRentPrice: number[],
  paymentToken: PaymentToken[],
  options?: any
) => Promise<ContractTransaction>;

export type SylvesterV0RentFunction = (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentDuration: number[],
  rentAmount: string[],
  options?: any
) => Promise<ContractTransaction>

export type SylvesterV0ReturnItFunction = (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentingID: string[],
  options?: any
) => Promise<ContractTransaction>;

export type SylvesterV0ClaimCollateralFunction = (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  rentingID: string[],
  options?: any
) => Promise<ContractTransaction>

export type SylvesterV0StopLendingFunction = (
  nftStandard: NFTStandard[],
  nftAddress: string[],
  tokenID: string[],
  lendingID: string[],
  options?: any
) => Promise<ContractTransaction>;

export type SylvesterV0FunctionInterface = AbstractSylvesterFunctionInterface<
  SylvesterV0LendFunction,
  SylvesterV0RentFunction,
  SylvesterV0ReturnItFunction,
  SylvesterV0ClaimCollateralFunction,
  SylvesterV0StopLendingFunction
>;

export type SylvesterInterfaceVersions = {
  readonly [SylvesterVersion.V0]: SylvesterV0FunctionInterface;
};
