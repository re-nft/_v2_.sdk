import {RenftContractType, ResolverVersion} from './types';

import {
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
} from './consts';

import {getContractAddressForDeployment} from './deployments';

export * from './contracts';
export * from './consts';
export * from './deployments';

export * from './types';
export * from './interfaces';
export * from './utils';

// TODO: These exports are now deprecated. Remove them and have the consumer compute them dynamically.

export const RESOLVER_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.RESOLVER,
});

export const RESOLVER_POLYGON_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
});

export const RESOLVER_FUJI_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.RESOLVER,
});

export const RESOLVER_AVALANCHE_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.RESOLVER,
});

export const AZRAEL_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.AZRAEL,
});

export const SYLVESTER_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.SYLVESTER,
});

export const SYLVESTER_POLYGON_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.SYLVESTER,
});

export const WHOOPI_FUJI_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.WHOOPI,
});

export const WHOOPI_AVALANCHE_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.WHOOPI,
});
