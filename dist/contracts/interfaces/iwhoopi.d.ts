import { ContractTransaction } from '@ethersproject/contracts';
import { PaymentToken } from '../../types';
interface IWhoopi {
    lend(nftAddress: string, tokenId: string[], upfrontRentFees: string[], revShareBeneficiaries: string[][], portions: number[][], maxRentDurations: number[], paymentTokens: PaymentToken[], allowedRenters?: string[][], options?: any): Promise<ContractTransaction>;
    rent(nftAddress: string, tokenId: string[], lendingId: string[], rentDurations: number[], options?: any): Promise<ContractTransaction>;
    stopRent(nftAddress: string, tokenId: string[], lendingId: string[], options?: any): Promise<ContractTransaction>;
    stopLending(nftAddress: string, tokenId: string[], lendingId: string[], options?: any): Promise<ContractTransaction>;
    pay(nftAddress: string, tokenId: string[], lendingId: string[], renterAddress: string[], amountToPay: string[], options?: any): Promise<ContractTransaction>;
}
export default IWhoopi;
