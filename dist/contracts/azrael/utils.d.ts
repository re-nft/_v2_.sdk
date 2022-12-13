import { Contract } from '@ethersproject/contracts';
import { AzraelV0ClaimCollateralFunction, AzraelV0LendFunction, AzraelV0RentFunction, AzraelV0ReturnItFunction, AzraelV0StopLendingFunction } from './types';
export declare const createAzraelV0LendThunk: (contract: Contract) => AzraelV0LendFunction;
export declare const createAzraelV0RentThunk: (contract: Contract) => AzraelV0RentFunction;
export declare const createAzraelV0ReturnItThunk: (contract: Contract) => AzraelV0ReturnItFunction;
export declare const createAzraelV0ClaimCollateralThunk: (contract: Contract) => AzraelV0ClaimCollateralFunction;
export declare const createAzraelV0StopLendingThunk: (contract: Contract) => AzraelV0StopLendingFunction;
