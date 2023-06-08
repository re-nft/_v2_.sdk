import abi from '../../abi/resolver.v0';
import {
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_GOERLI_TESTNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
} from '../consts';
import { Deployment, RenftContractType, ResolverVersion } from '../types';

export const DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0: Deployment<
  RenftContractType.RESOLVER,
  ResolverVersion.V0
> = {
  abi,
  contractAddress: '0x945E589A4715d1915e6FE14f08e4887Bc4019341',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_ETHEREUM_MAINNET,
  startBlock: 12875506,
  version: ResolverVersion.V0,
};

// note that this resolver actually allows us to change already set
// payment tokens. that is its only difference from the prod v0 resolver
// this is useful if an integrating project wishes to change their erc20
export const DEPLOYMENT_RESOLVER_ETHEREUM_GOERLI_TESTNET_V0: Deployment<
  RenftContractType.RESOLVER,
  ResolverVersion.V0
> = {
  abi,
  contractAddress: '0xF8834327e7f3f5103954E477A32dC742A6518A9C',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_ETHEREUM_GOERLI_TESTNET,
  startBlock: 8907116,
  version: ResolverVersion.V0,
};

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0: Deployment<
  RenftContractType.RESOLVER,
  ResolverVersion.V0
> = {
  abi,
  contractAddress: '0x6884d88Ce56C5C93F46eE23684eBA8628c90B518',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 28399112,
  version: ResolverVersion.V0,
};

export const DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0: Deployment<
  RenftContractType.RESOLVER,
  ResolverVersion.V0
> = {
  abi,
  contractAddress: '0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  startBlock: 11500156,
  version: ResolverVersion.V0,
};

export const DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0: Deployment<
  RenftContractType.RESOLVER,
  ResolverVersion.V0
> = {
  abi,
  contractAddress: '0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_AVALANCHE_MAINNET,
  startBlock: 19408332,
  version: ResolverVersion.V0,
};
