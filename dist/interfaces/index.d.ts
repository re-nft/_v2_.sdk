import { Contract } from '@ethersproject/contracts';
import { CreateVersionedContractInterfaceResult, EVMNetworkType } from '../types';
export declare const createInterfaceVersions: (contract: Contract, network: EVMNetworkType) => CreateVersionedContractInterfaceResult;
