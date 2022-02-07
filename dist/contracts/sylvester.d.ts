import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Signer } from '@ethersproject/abstract-signer';
import ISylvester from './interfaces/isylvester';
import { NFTStandard, PaymentToken } from '../types';
export declare class Sylvester implements ISylvester {
    readonly signer: Signer;
    protected contract: Contract;
    constructor(_signer: Signer, _address?: string);
    lend(nftStandard: NFTStandard[], nftAddress: string[], tokenID: BigNumber[], amount: number[], maxRentDuration: number[], dailyRentPrice: number[], paymentToken: PaymentToken[]): Promise<ContractTransaction>;
    rent(nftStandard: NFTStandard[], nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], rentDuration: number[], rentAmount: BigNumber[]): Promise<ContractTransaction>;
    returnIt(nftStandard: NFTStandard[], nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], rentingID: BigNumber[]): Promise<ContractTransaction>;
    claimCollateral(nftStandard: NFTStandard[], nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], rentingID: BigNumber[]): Promise<ContractTransaction>;
    stopLending(nftStandard: NFTStandard[], nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[]): Promise<ContractTransaction>;
}
