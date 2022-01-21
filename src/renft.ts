import { Signer, ContractTransaction, Contract, BigNumber } from 'ethers';

import { RENFT as RENFT_ADDRESS } from './consts';
import { IReNFT, PaymentToken, Price, Nfts } from './types';
import { ReNFT as AbiReNFT } from './abi';
import { prepareBatch } from './utils';

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
    nfts: Nfts,
    lendAmounts: number[],
    maxRentDurations: number[],
    dailyRentPrices: Price[],
    collaterals: Price[],
    paymentTokens: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nfts,
      lendAmounts,
      maxRentDurations,
      dailyRentPrices,
      collaterals,
      paymentTokens,
    });

    // (address[], uint256[], uint256[]) nfts,
    // uint256[] lendAmounts, uint8[] maxRentDurations,
    // (uint24, uint8)[] dailyRentPrices,
    // (uint24, uint8)[] collaterals,
    // uint8[] paymentTokens, { 'from': Account }

    return await this.contract.lend(
      [
        args.nfts.nft,
        args.nfts.tokenIds,
        Array(args.nfts.nft.length).fill(BigNumber.from('0')),
      ],
      args.lendAmounts,
      args.maxRentDurations,
      dailyRentPrices.map(x => [
        BigNumber.from(x.whole),
        BigNumber.from(x.decimal),
      ]),
      collaterals.map(x => [
        BigNumber.from(x.whole),
        BigNumber.from(x.decimal),
      ]),
      args.paymentTokens,
      options ? options : {}
    );
  }

  async rent(
    nfts: Nfts,
    rentDurations: number[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nfts,
      rentDurations,
    });

    return await this.contract.rent(
      [
        args.nfts.nft,
        args.nfts.tokenIds,
        Array(args.nfts.nft.length).fill(BigNumber.from('0')),
      ],
      args.rentDurations,
      options ? options : {}
    );
  }

  async returnIt(nfts: Nfts, options?: any): Promise<ContractTransaction> {
    const args = prepareBatch({ nfts });
    return await this.contract.returnIt([
      args.nfts.nft,
      args.nfts.tokenIds,
      Array(args.nfts.nft.length).fill(BigNumber.from('0')),
      options ? options : {},
    ]);
  }

  async claimCollateral(
    nfts: Nfts,
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({ nfts });
    return await this.contract.claimCollateral([
      args.nfts.nft,
      args.nfts.tokenIds,
      Array(args.nfts.nft.length).fill(BigNumber.from('0')),
      options ? options : {},
    ]);
  }

  async stopLending(nfts: Nfts, options?: any): Promise<ContractTransaction> {
    const args = prepareBatch({ nfts });
    return await this.contract.stopLending([
      args.nfts.nft,
      args.nfts.tokenIds,
      Array(args.nfts.nft.length).fill(BigNumber.from('0')),
      options ? options : {},
    ]);
  }
}
