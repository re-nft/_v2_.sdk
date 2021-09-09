import { Signer, BigNumber, ContractTransaction, Contract } from 'ethers';

import { REGISTRY as RENFT_ADDRESS } from './consts';
import { IReNFT, PaymentToken, NFTStandard } from './types';
import { Registry as AbiReNFT } from './abi';
import { prepareBatch, packPrice } from './utils';

export class ReNFT implements IReNFT {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer, _address?: string) {
    this.signer = _signer;
    this.contract = new Contract(
      _address ?? RENFT_ADDRESS,
      AbiReNFT,
      this.signer
    );
  }

  async lend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendAmount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendAmount: lendAmount.map(amt => Number(amt)),
      maxRentDuration: maxRentDuration.map(x => Number(x)),
      dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
      paymentToken,
    });
    return await this.contract.lend(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendAmount,
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
    rentAmount: number[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentDuration: rentDuration.map(x => Number(x)),
      rentAmount: rentAmount.map(x => Number(x))
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

  async stopRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentingID: rentingID.map(x => BigNumber.from(x))
    });
    return await this.contract.stopRent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID
    );
  }

  async claimRent(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[],
    rentingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
      rentingID: rentingID.map(x => BigNumber.from(x))
    });
    return await this.contract.claimRent(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentingID
    );
  }

  async stopLend(
    nftStandard: NFTStandard[],
    nftAddress: string[],
    tokenID: BigNumber[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftStandard,
      nftAddress: nftAddress.map(nft => String(nft).toLowerCase()),
      tokenID: tokenID.map(id => BigNumber.from(id)),
      lendingID: lendingID.map(x => BigNumber.from(x)),
    });
    return await this.contract.stopLending(
      args.nftStandard,
      args.nftAddress,
      args.tokenID,
      args.lendingID
    );
  }
}
