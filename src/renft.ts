import { Signer, BigNumber, ContractTransaction, Contract } from "ethers";

import { RENFT as RENFT_ADDRESS } from "./consts";
import { IReNFT, PaymentToken } from "./types";
import { ReNFT as AbiReNFT } from "./abi";
import { prepareBatch, packPrice } from "./utils";

export class ReNFT implements IReNFT {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer) {
    this.signer = _signer;
    // * will fail on the networks we haven't deployed to yet
    this.contract = new Contract(RENFT_ADDRESS, AbiReNFT, this.signer);
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
      nftAddress: nftAddress.map((nft) => String(nft).toLowerCase()),
      tokenID: tokenID.map((id) => BigNumber.from(id)),
      amount: amount.map((amt) => Number(amt)),
      maxRentDuration: maxRentDuration.map((x) => Number(x)),
      dailyRentPrice: dailyRentPrice.map((x) => packPrice(Number(x).toString())),
      nftPrice: nftPrice.map((x) => packPrice(Number(x).toString())),
      paymentToken
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
    lentAmount: number[],
    lendingID: BigNumber[],
    rentDuration: number[]
  ): Promise<ContractTransaction> {

    const args = prepareBatch({
      nftAddress: nftAddress.map((nft) => String(nft).toLowerCase()),
      tokenID: tokenID.map((id) => BigNumber.from(id)),
      amount: lentAmount.map((amt) => Number(amt)),
      lendingID: lendingID.map((x) => BigNumber.from(x)),
      rentDuration: rentDuration.map((x) => Number(x))
    });
  
    return await this.contract.rent(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    );

  }

  async returnIt(
    nftAddress: string[],
    tokenID: BigNumber[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {

    const args = prepareBatch({
      nftAddress: nftAddress.map((nft) => String(nft).toLowerCase()),
      tokenID: tokenID.map((id) => BigNumber.from(id)),
      amount: lentAmount.map((amt) => Number(amt)),
      lendingID: lendingID.map((x) => BigNumber.from(x)),
    });

    return await this.contract.returnIt(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID
    );
  
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: BigNumber[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {

    const args = prepareBatch({
      nftAddress: nftAddress.map((nft) => String(nft).toLowerCase()),
      tokenID: tokenID.map((id) => BigNumber.from(id)),
      amount: lentAmount.map((amt) => Number(amt)),
      lendingID: lendingID.map((x) => BigNumber.from(x)),
    });

    return await this.contract.claimCollateral(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID
    );

  }

  async stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {

    const args = prepareBatch({
      nftAddress: nftAddress.map((nft) => String(nft).toLowerCase()),
      tokenID: tokenID.map((id) => BigNumber.from(id)),
      amount: lentAmount.map((amt) => Number(amt)),
      lendingID: lendingID.map((x) => BigNumber.from(x)),
    });

    return await this.contract.stopLending(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID
    );

  }
}