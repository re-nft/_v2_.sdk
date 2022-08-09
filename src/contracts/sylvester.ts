import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { SylvesterAddress } from '../consts';
import ISylvester from './interfaces/isylvester';
import SylvesterAbi from '../abi/sylvester.abi';
import { prepareBatch, packPrice } from '../utils';
import { NFTStandard, PaymentToken } from '../types';

export class Sylvester implements ISylvester {
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

  async lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      amount: amount.map(Number),
      maxRentDuration: maxRentDuration.map(Number),
      dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
      paymentToken,
    });

    return await this.contract.lend(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.paymentToken,
      options ?? []
    );
  }

  async rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    rentAmount: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(Number),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
      rentDuration: rentDuration.map(Number),
      rentAmount: rentAmount.map(String),
    });

    return await this.contract.rent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentDuration,
      args.rentAmount,
      options ?? []
    );
  }

  async returnIt(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(Number),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
      rentingID: rentingID.map(String),
    });

    return await this.contract.stopRent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID,
      options ?? []
    );
  }

  async claimCollateral(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentingID: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(Number),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
      rentingID: rentingID.map(String),
    });

    return await this.contract.claimRent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID,
      options ?? []
    );
  }

  async stopLending(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(Number),
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
    });

    return await this.contract.stopLend(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      options ?? []
    );
  }
}
