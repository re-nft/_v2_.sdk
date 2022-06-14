import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from '@ethersproject/abstract-signer';
import IWhoopi from './interfaces/iwhoopi';
import { PaymentToken } from '../types';
export declare class Whoopi implements IWhoopi {
    readonly signer: Signer;
    protected contract: Contract;
    constructor(_signer: Signer, _address?: string);
    lend(nftAddress: string[], tokenID: BigNumber[], upfrontRentFees: number[], revShareBeneficiaries: string[][], revSharePortions: number[][], maxRentDurations: number[], paymentTokens: PaymentToken[], allowedRenters?: string[][], options?: any): Promise<ContractTransaction>;
    rent(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], rentDurations: number[], options?: any): Promise<ContractTransaction>;
    stopRent(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], options?: any): Promise<ContractTransaction>;
    stopLending(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], options?: any): Promise<ContractTransaction>;
    pay(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], renterAddress: string[], amountToPay: number[], options?: any): Promise<ContractTransaction>;
}
