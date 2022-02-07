import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from '@ethersproject/abstract-signer';
import IAzrael from './interfaces/iazrael';
import { PaymentToken } from '../types';
export declare class Azrael implements IAzrael {
    readonly signer: Signer;
    protected contract: Contract;
    constructor(_signer: Signer, _address?: string);
    lend(nftAddress: string[], tokenID: BigNumber[], amount: number[], maxRentDuration: number[], dailyRentPrice: number[], nftPrice: number[], paymentToken: PaymentToken[]): Promise<ContractTransaction>;
    rent(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], rentDuration: number[]): Promise<ContractTransaction>;
    returnIt(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[]): Promise<ContractTransaction>;
    claimCollateral(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[]): Promise<ContractTransaction>;
    stopLending(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[]): Promise<ContractTransaction>;
}
