import { Signer, BigNumber, ContractTransaction, Contract } from "ethers";

import { IReNFT, PaymentToken } from "./types";
import { ReNFT as AbiReNFT } from "./abi";
import { prepareBatch, packPrice } from "./utils";

export class ReNFT implements IReNFT {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer, _contract: Contract) {
    this.signer = _signer;
    // * will fail on the networks we haven't deployed to yet
    this.contract = new Contract('0x610178dA211FEF7D417bC0e6FeD39F05609AD788', AbiReNFT, this.signer);
  }

  // TODO: if length 1, then skip everything
  async lend(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[]
  ): Promise<ContractTransaction> {
    if (nftAddress.length == 1) {
      return await this.contract.lend(
        nftAddress,
        tokenID,
        amount,
        maxRentDuration,
        packPrice(Number(dailyRentPrice).toString()),
        packPrice(Number(nftPrice).toString()),
        paymentToken
      );
    }

    const _nftAddress: string[] = [];
    const _tokenID: BigNumber[] = [];
    const _is721: boolean[] = [];
    const _amount: number[] = [];
    const _maxRentDuration: number[] = [];
    const _dailyRentPrice: string[] = [];
    const _nftPrice: string[] = [];

    for (let i = 0; i < nftAddress.length; i++) {
      _nftAddress.push(String(nftAddress[i]).toLowerCase());
      _tokenID.push(BigNumber.from(tokenID[i]));
      _is721.push(Boolean(is721[i]));
      _amount.push(Number(amount[i]));
      _maxRentDuration.push(Number(maxRentDuration[i]));
      _dailyRentPrice.push(packPrice(Number(dailyRentPrice[i]).toString()));
      _nftPrice.push(packPrice(Number(nftPrice[i]).toString()));
    }

    const args = prepareBatch({
      nftAddress: _nftAddress,
      tokenID: _tokenID,
      is721: _is721,
      amount: _amount,
      maxRentDuration: _maxRentDuration,
      dailyRentPrice: _dailyRentPrice,
      nftPrice: _nftPrice,
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
    )
  }

  async rent(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[],
    rentDuration: number[]
  ): Promise<ContractTransaction> {
    const _nftAddress: string[] = [];
    const _tokenID: BigNumber[] = [];
    const _is721: boolean[] = [];
    const _amount: number[] = [];
    const _lendingID: BigNumber[] = [];
    const _rentDuration: number[] = [];

    for (let i = 0; i < nftAddress.length; i++) {
      _nftAddress.push(String(nftAddress[i]).toLowerCase());
      _tokenID.push(BigNumber.from(tokenID[i]));
      _is721.push(Boolean(is721[i]));
      _amount.push(Number(lentAmount[i]));
      _lendingID.push(BigNumber.from(lendingID[i]));
      _rentDuration.push(Number(rentDuration[i]));
    }

    const args = prepareBatch({
      nftAddress: _nftAddress,
      tokenID: _tokenID,
      is721,
      amount: _amount,
      lendingID: _lendingID,
      rentDuration: _rentDuration
    });
  
    return await this.contract.rent(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }

  async returnIt(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const _nftAddress: string[] = [];
    const _tokenID: BigNumber[] = [];
    const _is721: boolean[] = [];
    const _amount: number[] = [];
    const _lendingID: BigNumber[] = [];

    for (let i = 0; i < nftAddress.length; i++) {
      _nftAddress.push(String(nftAddress[i]).toLowerCase());
      _tokenID.push(BigNumber.from(tokenID[i]));
      _is721.push(Boolean(is721[i]));
      _amount.push(Number(lentAmount[i]));
      _lendingID.push(BigNumber.from(lendingID[i]));
    }

    const args = prepareBatch({
      nftAddress: _nftAddress,
      tokenID: _tokenID,
      is721,
      amount: _amount,
      lendingID: _lendingID
    });

    return await this.contract.returnIt(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID
    )
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const _nftAddress: string[] = [];
    const _tokenID: BigNumber[] = [];
    const _is721: boolean[] = [];
    const _amount: number[] = [];
    const _lendingID: BigNumber[] = [];

    for (let i = 0; i < nftAddress.length; i++) {
      _nftAddress.push(String(nftAddress[i]).toLowerCase());
      _tokenID.push(BigNumber.from(tokenID[i]));
      _is721.push(Boolean(is721[i]));
      _amount.push(Number(lentAmount[i]));
      _lendingID.push(BigNumber.from(lendingID[i]));
    }

    const args = prepareBatch({
      nftAddress: _nftAddress,
      tokenID: _tokenID,
      is721,
      amount: _amount,
      lendingID: _lendingID
    });

    return await this.contract.claimCollateral(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }

  async stopLending(
    nftAddress: string[],
    tokenID: BigNumber[],
    is721: boolean[],
    lentAmount: number[],
    lendingID: BigNumber[]
  ): Promise<ContractTransaction> {
    const _nftAddress: string[] = [];
    const _tokenID: BigNumber[] = [];
    const _is721: boolean[] = [];
    const _amount: number[] = [];
    const _lendingID: BigNumber[] = [];

    for (let i = 0; i < nftAddress.length; i++) {
      _nftAddress.push(String(nftAddress[i]).toLowerCase());
      _tokenID.push(BigNumber.from(tokenID[i]));
      _is721.push(Boolean(is721[i]));
      _amount.push(Number(lentAmount[i]));
      _lendingID.push(BigNumber.from(lendingID[i]));
    }

    const args = prepareBatch({
      nftAddress: _nftAddress,
      tokenID: _tokenID,
      is721,
      amount: _amount,
      lendingID: _lendingID
    });

    return await this.contract.stopLending(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.lendingID,
      args.rentDuration
    )
  }
}