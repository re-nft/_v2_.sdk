import { ContractTransaction } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { PaymentToken, NFTStandard } from '../../types';

// v1 collateral free
interface ISylvester {
  lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction>;

  rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDuration: number[],
    rentAmount: BigNumber[]
  ): Promise<ContractTransaction>;

  returnIt(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction>;

  // aka claimRent
  claimCollateral(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction>;

  stopLending(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction>;
}

export default ISylvester;
