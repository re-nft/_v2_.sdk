import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { SylvesterAddress } from '../consts';
import SylvesterAbi from '../abi/sylvester.abi';
import { NFTStandard, PaymentToken } from '../types';
import {
  createSylvesterV0ClaimCollateralThunk,
  createSylvesterV0LendThunk,
  createSylvesterV0RentThunk,
  createSylvesterV0ReturnItThunk,
  createSylvesterV0StopLendingThunk
} from '../contracts2/sylvester/utils';
import {SylvesterV0FunctionInterface} from '../contracts2/sylvester/types';

export class Sylvester implements SylvesterV0FunctionInterface {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer, _address?: string) {
    this.signer = _signer;
    this.contract = new Contract(
      _address ?? SylvesterAddress,
      SylvesterAbi.abi,
      this.signer
    );
  }

  lend = (
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction> => createSylvesterV0LendThunk(this.contract)(
    nftStandard,
    nftAddress,
    tokenID,
    amount,
    maxRentDuration,
    dailyRentPrice,
    paymentToken,
    options,
  );

  rent = (
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    rentAmount: string[],
    options?: any
  ): Promise<ContractTransaction> => createSylvesterV0RentThunk(this.contract)(
    nftStandard,
    nftAddress,
    tokenID,
    lendingID,
    rentDuration,
    rentAmount,
    options,
  );

  returnIt = (
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ContractTransaction> => createSylvesterV0ReturnItThunk(this.contract)(
    nftStandard,
    nftAddress,
    tokenID,
    lendingID,
    rentingID,
    options,
  );

  claimCollateral = (
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ContractTransaction> => createSylvesterV0ClaimCollateralThunk(this.contract)(
    nftStandard,
    nftAddress,
    tokenID,
    lendingID,
    rentingID,
    options,
  );

  stopLending = (
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> => createSylvesterV0StopLendingThunk(this.contract)(
    nftStandard,
    nftAddress,
    tokenID,
    lendingID,
    options,
  );
}
