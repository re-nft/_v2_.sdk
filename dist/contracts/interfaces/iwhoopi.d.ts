import { ContractTransaction } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { PaymentToken } from '../../types';
interface IWhoopi {
    lend(nftAddress: string[], tokenID: BigNumber[], upfrontRentFees: number[], revShareBeneficiaries: string[][], portions: number[][], maxRentDurations: number[], paymentTokens: PaymentToken[], allowedRenters?: string[][], options?: any): Promise<ContractTransaction>;
    rent(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], rentDurations: number[], options?: any): Promise<ContractTransaction>;
    stopRent(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], options?: any): Promise<ContractTransaction>;
    stopLending(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], options?: any): Promise<ContractTransaction>;
    pay(nftAddress: string[], tokenID: BigNumber[], lendingID: BigNumber[], renterAddress: string[], amountToPay: number[], options?: any): Promise<ContractTransaction>;
}
export default IWhoopi;
