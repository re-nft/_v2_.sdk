import { RenftContractType, ResolverVersion, SylvesterVersion } from './types';

import {
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
} from './consts';

import { getContractAddressForDeployment } from './deployments';

import { PaymentToken as DefaultPaymentToken } from './types';

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
  // HACK: Existing consumers expect the v0 contract version.
  version: SylvesterVersion.V0,
});

export const WHOOPI_FUJI_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.WHOOPI,
});

export const WHOOPI_AVALANCHE_ADDRESS = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.WHOOPI,
});

let emittedWarning: boolean = false;

/**
 * @deprecated This Object is deprecated and will be removed in the next major release.
 * Please refer to the SDK documentation for further instructions.
 */
export const PaymentToken = new Proxy(DefaultPaymentToken, {
  get: (target, prop, _receiver) => {
    if (!emittedWarning) {
      console.warn(
        'PaymentToken enum is deprecated and will be removed in the next major release. Please refer to the SDK documentation for further instructions.'
      );
      emittedWarning = true;
    }

    return target[prop as keyof typeof target];
  },
});
