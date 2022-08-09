import { ContractTransaction } from '@ethersproject/contracts';

import { PaymentToken } from '../../types';

// v1 collateral
interface IAzrael {
  lend(
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction>;

  rent(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    options?: any
  ): Promise<ContractTransaction>;

  returnIt(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction>;

  claimCollateral(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction>;

  stopLending(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction>;
}

export default IAzrael;
