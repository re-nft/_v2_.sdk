import {
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
  RenftContractType,
  ResolverVersion,
  SylvesterVersion,
} from '../core';
import { getContractAddressForDeployment } from './deployments';

export * from './consts';
export * from './contracts';
export * from './deployments';
export * from './interfaces';
export * from './types';

// TODO: These exports are now deprecated. Remove them and have the consumer compute them dynamically.

/**
 * @deprecated Use RESOLVER_ETHEREUM_ADDRESS instead
 */
export const RESOLVER_ADDRESS = '0x945e589a4715d1915e6fe14f08e4887bc4019341';

export const RESOLVER_ETHEREUM_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_ETHEREUM_MAINNET,
});

export const RESOLVER_POLYGON_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_POLYGON_MAINNET,
  version: ResolverVersion.V0,
});

export const RESOLVER_FUJI_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
});

export const RESOLVER_AVALANCHE_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_AVALANCHE_MAINNET,
});

/**
 * @deprecated Use AZRAEL_ETHEREUM_ADDRESS instead
 */
export const AZRAEL_ADDRESS = '0x94d8f036a0fbc216bb532d33bdf6564157af0cd7';

export const AZRAEL_ETHEREUM_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.AZRAEL,
  network: NETWORK_ETHEREUM_MAINNET,
});

export const SYLVESTER_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_ETHEREUM_MAINNET,
});

export const SYLVESTER_POLYGON_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_POLYGON_MAINNET,
  // HACK: Existing consumers expect the v0 contract version.
  version: SylvesterVersion.V0,
});

export const WHOOPI_FUJI_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.WHOOPI,
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
});

export const WHOOPI_AVALANCHE_ADDRESS = getContractAddressForDeployment({
  contractType: RenftContractType.WHOOPI,
  network: NETWORK_AVALANCHE_MAINNET,
});
