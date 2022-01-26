import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
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
    tokenID: BigNumber[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      amount: amount.map(amt => Number(amt)),
      maxRentDuration: maxRentDuration.map(x => Number(x)),
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
      args.paymentToken
    );
  }

  async rent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDuration: number[],
    rentAmount: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(standard => Number(standard)),
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentDuration: rentDuration.map(x => Number(x)),
      rentAmount: rentAmount.map(x => BigNumber.from(x)),
    });

    return await this.contract.rent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentDuration,
      args.rentAmount
    );
  }

  async returnIt(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(standard => Number(standard)),
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentingID: rentingID.map(x => BigNumber.from(x)),
    });

    return await this.contract.stopRent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID
    );
  }

  async claimCollateral(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(standard => Number(standard)),
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentingID: rentingID.map(x => BigNumber.from(x)),
    });

    return await this.contract.claimRent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID
    );
  }

  async stopLending(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard: nftStandard.map(standard => Number(standard)),
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
    });

    return await this.contract.stopLend(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID
    );
  }
}
