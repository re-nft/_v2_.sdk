import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { AzraelAddress } from '../consts';
import AzraelAbi from '../abi/azrael.abi';
import { PaymentToken } from '../types';
import {
  createAzraelV0ClaimCollateralThunk,
  createAzraelV0LendThunk,
  createAzraelV0RentThunk,
  createAzraelV0ReturnItThunk,
  createAzraelV0StopLendingThunk
} from '../contracts2/azrael/utils';
import {AzraelV0FunctionInterface} from '../contracts2/azrael/types';

export class Azrael implements AzraelV0FunctionInterface {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer, _address?: string) {
    this.signer = _signer;
    this.contract = new Contract(
      _address ?? AzraelAddress,
      AzraelAbi.abi,
      this.signer
    );
  }

  lend = (
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction> => createAzraelV0LendThunk(this.contract)(
    nftAddress,
    tokenID,
    amount,
    maxRentDuration,
    dailyRentPrice,
    nftPrice,
    paymentToken,
    options,
  );

  rent = (
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    options?: any
  ): Promise<ContractTransaction> => createAzraelV0RentThunk(this.contract)(
    nftAddress,
    tokenID,
    lendingID,
    rentDuration,
    options,
  );

  returnIt = (
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> => createAzraelV0ReturnItThunk(this.contract)(
    nftAddress,
    tokenID,
    lendingID,
    options,
  );

  claimCollateral = (
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> => createAzraelV0ClaimCollateralThunk(this.contract)(
    nftAddress,
    tokenID,
    lendingID,
    options,
  );

  stopLending = (
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> => createAzraelV0StopLendingThunk(this.contract)(
    nftAddress,
    tokenID,
    lendingID,
    options,
  );
}
