import { Contract } from '@ethersproject/contracts';
import { EVMNetworkType } from '../../types';
import { WhoopiV0LendFunction, WhoopiV0PayFunction, WhoopiV0RentFunction, WhoopiV0StopLendingFunction, WhoopiV0StopRentFunction } from './types';
export declare const createWhoopiV0LendThunk: (contract: Contract, network: EVMNetworkType) => WhoopiV0LendFunction;
export declare const createWhoopiV0RentThunk: (contract: Contract) => WhoopiV0RentFunction;
export declare const createWhoopiV0StopRentThunk: (contract: Contract) => WhoopiV0StopRentFunction;
export declare const createWhoopiV0StopLendingThunk: (contract: Contract) => WhoopiV0StopLendingFunction;
export declare const createWhoopiV0PayThunk: (contract: Contract) => WhoopiV0PayFunction;
