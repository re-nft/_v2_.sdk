import azrael_v0 from '../abi/azrael.v0';
import resolver_v0 from '../abi/resolver.v0';
import resolver_v1 from '../abi/resolver.v1';
import sylvester_v0 from '../abi/sylvester.v0';
import sylvester_v1 from '../abi/sylvester.v1';
import whoopi_v0 from '../abi/whoopi.v0';
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
  [AzraelVersion.V0]: azrael_v0,
};

export const SYLVESTER_ABI_VERSIONS: SylvesterAbiVersions = {
  [SylvesterVersion.V0]: sylvester_v0,
  [SylvesterVersion.V1]: sylvester_v1,
};

export const WHOOPI_ABI_VERSIONS: WhoopiAbiVersions = {
  [WhoopiVersion.V0]: whoopi_v0,
};

export const RESOLVER_ABI_VERSIONS: ResolverAbiVersions = {
  [ResolverVersion.V0]: resolver_v0,
  [ResolverVersion.V1]: resolver_v1,
};

export const CONTRACT_ABI_VERSIONS: ContractAbiVersions = {
  [RenftContractType.AZRAEL]: AZRAEL_ABI_VERSIONS,
  [RenftContractType.SYLVESTER]: SYLVESTER_ABI_VERSIONS,
  [RenftContractType.WHOOPI]: WHOOPI_ABI_VERSIONS,
  [RenftContractType.RESOLVER]: RESOLVER_ABI_VERSIONS,
};
