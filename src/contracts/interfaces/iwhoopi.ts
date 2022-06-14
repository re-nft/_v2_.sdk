import { ContractTransaction } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

// * Note that there is no RENT payment token on avalanche (as of 14th June 2022)
import { PaymentToken } from '../../types';

// Wildlife avalanche mainnet v1 rev share
interface IWhoopi {
  lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    upfrontRentFees: number[],
    revShareBeneficiaries: string[][],
    portions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][],
    options?: any
  ): Promise<ContractTransaction>;

  rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction>;

  // This is only callable by the stop rent bot.
  stopRent(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    options?: any
  ): Promise<ContractTransaction>;

  stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    options?: any
  ): Promise<ContractTransaction>;

  pay(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    renterAddress: string[],
    amountToPay: number[],
    options?: any
  ): Promise<ContractTransaction>;
}

export default IWhoopi;
