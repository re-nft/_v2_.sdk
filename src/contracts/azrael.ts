import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from '@ethersproject/abstract-signer';

import { AzraelAddress } from '../consts';
import IAzrael from './interfaces/iazrael';
import AzraelAbi from '../abi/azrael.abi';
import { prepareBatch, packPrice } from '../utils';
import { PaymentToken } from '../types';

export class Azrael implements IAzrael {
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

  async lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      amount: amount.map(amt => Number(amt)),
      maxRentDuration: maxRentDuration.map(x => Number(x)),
      dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
      nftPrice: nftPrice.map(x => packPrice(Number(x).toString())),
      paymentToken,
    });

    return await this.contract.lend(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.nftPrice,
      args.paymentToken
    );
  }

  async rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentDuration: number[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentDuration: rentDuration.map(x => Number(x)),
    });

    return await this.contract.rent(
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentDuration
    );
  }

  async returnIt(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
    });

    return await this.contract.returnIt(
      args.nftAddress,
      args.tokenID,
      args.lendingID
    );
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
    });

    return await this.contract.claimCollateral(
      args.nftAddress,
      args.tokenID,
      args.lendingID
    );
  }

  async stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
    });

    return await this.contract.stopLending(
      args.nftAddress,
      args.tokenID,
      args.lendingID
    );
  }
}
