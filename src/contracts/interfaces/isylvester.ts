import { ContractTransaction } from '@ethersproject/contracts';

import { PaymentToken, NFTStandard } from '../../types';

// v1 collateral free
interface ISylvester {
  lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction>;

  rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    rentAmount: string[],
    options?: any
  ): Promise<ContractTransaction>;

  returnIt(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ContractTransaction>;

  // aka claimRent
  claimCollateral(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ContractTransaction>;

  stopLending(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction>;
}

export default ISylvester;
