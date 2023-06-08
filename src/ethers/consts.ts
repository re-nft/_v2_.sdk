import {
  AzraelV0Abi,
  ResolverV0Abi,
  ResolverV1Abi,
  SylvesterV0Abi,
  SylvesterV1Abi,
  WhoopiV0Abi,
} from '../abi';
import {
  AzraelVersion,
  RenftContractType,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
} from '../core';
import {
  AzraelAbiVersions,
  ContractAbiVersions,
  ResolverAbiVersions,
  SylvesterAbiVersions,
  WhoopiAbiVersions,
} from './types';

export const AZRAEL_ABI_VERSIONS: AzraelAbiVersions = {
  [AzraelVersion.V0]: AzraelV0Abi,
};

export const SYLVESTER_ABI_VERSIONS: SylvesterAbiVersions = {
  [SylvesterVersion.V0]: SylvesterV0Abi,
  [SylvesterVersion.V1]: SylvesterV1Abi,
};

export const WHOOPI_ABI_VERSIONS: WhoopiAbiVersions = {
  [WhoopiVersion.V0]: WhoopiV0Abi,
};

export const RESOLVER_ABI_VERSIONS: ResolverAbiVersions = {
  [ResolverVersion.V0]: ResolverV0Abi,
  [ResolverVersion.V1]: ResolverV1Abi,
};

export const CONTRACT_ABI_VERSIONS: ContractAbiVersions = {
  [RenftContractType.AZRAEL]: AZRAEL_ABI_VERSIONS,
  [RenftContractType.SYLVESTER]: SYLVESTER_ABI_VERSIONS,
  [RenftContractType.WHOOPI]: WHOOPI_ABI_VERSIONS,
  [RenftContractType.RESOLVER]: RESOLVER_ABI_VERSIONS,
};
