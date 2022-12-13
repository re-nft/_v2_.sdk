import { Contract } from '@ethersproject/contracts';
import { SylvesterV0ClaimCollateralFunction, SylvesterV0LendFunction, SylvesterV0RentFunction, SylvesterV0ReturnItFunction, SylvesterV0StopLendingFunction } from './types';
export declare const createSylvesterV0LendThunk: (contract: Contract) => SylvesterV0LendFunction;
export declare const createSylvesterV1LendThunk: (contract: Contract) => SylvesterV0LendFunction;
export declare const createSylvesterV0RentThunk: (contract: Contract) => SylvesterV0RentFunction;
export declare const createSylvesterV0ReturnItThunk: (contract: Contract) => SylvesterV0ReturnItFunction;
export declare const createSylvesterV0ClaimCollateralThunk: (contract: Contract) => SylvesterV0ClaimCollateralFunction;
export declare const createSylvesterV0StopLendingThunk: (contract: Contract) => SylvesterV0StopLendingFunction;
