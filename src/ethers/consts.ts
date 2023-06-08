import AzraelV0Abi from '../abi/azrael.v0';
import ResolverV0Abi from '../abi/resolver.v0';
import ResolverV1Abi from '../abi/resolver.v1';
import SylvesterV0Abi from '../abi/sylvester.v0';
import SylvesterV1Abi from '../abi/sylvester.v1';
import WhoopiV0Abi from '../abi/whoopi.v0';
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
