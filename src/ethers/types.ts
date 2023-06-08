import { ContractInterface } from '@ethersproject/contracts';

import {
  AzraelVersion,
  Network,
  RenftContractType,
  RenftContractVersion,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
} from '../core';
import {
  AzraelInterfaceVersions,
  ResolverInterfaceVersions,
  SylvesterInterfaceVersions,
  WhoopiInterfaceVersions,
} from './contracts';

// We need to relate contracts to their versions
type AbstractVersionedAbis<Version extends RenftContractVersion> = {
  readonly [key in Version]: ContractInterface;
};

export type AzraelAbiVersions = AbstractVersionedAbis<AzraelVersion>;
export type SylvesterAbiVersions = AbstractVersionedAbis<SylvesterVersion>;
export type WhoopiAbiVersions = AbstractVersionedAbis<WhoopiVersion>;
export type ResolverAbiVersions = AbstractVersionedAbis<ResolverVersion>;

export type ContractAbiVersions = {
  readonly [RenftContractType.AZRAEL]: AzraelAbiVersions;
  readonly [RenftContractType.SYLVESTER]: SylvesterAbiVersions;
  readonly [RenftContractType.WHOOPI]: WhoopiAbiVersions;
  readonly [RenftContractType.RESOLVER]: ResolverAbiVersions;
};

export type CreateVersionedContractInterfaceResult = {
  readonly [RenftContractType.AZRAEL]: AzraelInterfaceVersions;
  readonly [RenftContractType.SYLVESTER]: SylvesterInterfaceVersions;
  readonly [RenftContractType.WHOOPI]: WhoopiInterfaceVersions;
  readonly [RenftContractType.RESOLVER]: ResolverInterfaceVersions;
};

export type AbstractRenftContractDeployment<
  ContractType extends keyof CreateVersionedContractInterfaceResult,
  Version extends keyof CreateVersionedContractInterfaceResult[ContractType]
> = {
  readonly contractType: ContractType;
  readonly version: Version;
  readonly contractAddress: string;
  readonly network: Network;
  readonly startBlock: number;
};
