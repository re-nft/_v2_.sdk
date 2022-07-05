import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import IWhoopi from './interfaces/iwhoopi';
import { PaymentToken } from '../types';
export declare class Whoopi implements IWhoopi {
    readonly signer: Signer;
    protected contract: Contract;
    constructor(_signer: Signer, _address?: string);
    lend(nftAddress: string, tokenId: string[], upfrontRentFees: string[], revShareBeneficiaries: string[][], revSharePortions: number[][], maxRentDurations: number[], paymentTokens: PaymentToken[], allowedRenters?: string[][], options?: any): Promise<ContractTransaction>;
    rent(nftAddress: string, tokenId: string[], lendingId: string[], rentDurations: number[], options?: any): Promise<ContractTransaction>;
    stopRent(nftAddress: string, tokenId: string[], lendingId: string[], options?: any): Promise<ContractTransaction>;
    stopLending(nftAddress: string, tokenId: string[], lendingId: string[], options?: any): Promise<ContractTransaction>;
    pay(nftAddress: string, tokenId: string[], lendingId: string[], renterAddress: string[], amountToPay: string[], options?: any): Promise<ContractTransaction>;
}
