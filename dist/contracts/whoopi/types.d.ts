import { ContractTransaction } from '@ethersproject/contracts';
import { PaymentToken, WhoopiVersion } from '../../types';
export declare type AbstractWhoopiFunctionInterface<LendFunction, RentFunction, StopRentFunction, StopLendingFunction, PayFunction> = {
    readonly lend: LendFunction;
    readonly rent: RentFunction;
    readonly stopRent: StopRentFunction;
    readonly stopLending: StopLendingFunction;
    readonly pay: PayFunction;
};
export declare type WhoopiV0LendFunction = (nftAddress: string, tokenId: string[], upfrontRentFees: string[], revShareBeneficiaries: string[][], portions: number[][], maxRentDurations: number[], paymentTokens: PaymentToken[], allowedRenters?: string[][], options?: any) => Promise<ContractTransaction>;
export declare type WhoopiV0RentFunction = (nftAddress: string, tokenId: string[], lendingId: string[], rentDurations: number[], options?: any) => Promise<ContractTransaction>;
export declare type WhoopiV0StopRentFunction = (nftAddress: string, tokenId: string[], lendingId: string[], options?: any) => Promise<ContractTransaction>;
export declare type WhoopiV0StopLendingFunction = (nftAddress: string, tokenId: string[], lendingId: string[], options?: any) => Promise<ContractTransaction>;
export declare type WhoopiV0PayFunction = (nftAddress: string, tokenId: string[], lendingId: string[], renterAddress: string[], amountToPay: string[], options?: any) => Promise<ContractTransaction>;
export declare type WhoopiV0FunctionInterface = AbstractWhoopiFunctionInterface<WhoopiV0LendFunction, WhoopiV0RentFunction, WhoopiV0StopRentFunction, WhoopiV0StopLendingFunction, WhoopiV0PayFunction>;
export declare type WhoopiInterfaceVersions = {
    readonly [WhoopiVersion.V0]: WhoopiV0FunctionInterface;
};
