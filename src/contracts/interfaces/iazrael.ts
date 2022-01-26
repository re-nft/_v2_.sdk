import { ContractTransaction } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { PaymentToken } from '../../types';

// v1 collateral
interface IAzrael {
  lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction>;

  rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDuration: number[]
  ): Promise<ContractTransaction>;

  returnIt(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>;

  claimCollateral(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>;

  stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>;
}

export default IAzrael;
