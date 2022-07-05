import { ContractTransaction } from '@ethersproject/contracts';

// * Note that there is no RENT payment token on avalanche (as of 14th June 2022)
import { PaymentToken } from '../../types';

// Wildlife avalanche mainnet v1 rev share
interface IWhoopi {
  lend(
    nftAddress: string,
    tokenId: string[],
    upfrontRentFees: string[],
    revShareBeneficiaries: string[][],
    portions: number[][],
    maxRentDurations: number[],
    paymentTokens: PaymentToken[],
    allowedRenters?: string[][],
    options?: any
  ): Promise<ContractTransaction>;

  rent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction>;

  // This is only callable by the stop rent bot.
  stopRent(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ContractTransaction>;

  stopLending(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    options?: any
  ): Promise<ContractTransaction>;

  pay(
    nftAddress: string,
    tokenId: string[],
    lendingId: string[],
    renterAddress: string[],
    amountToPay: string[],
    options?: any
  ): Promise<ContractTransaction>;
}

export default IWhoopi;
