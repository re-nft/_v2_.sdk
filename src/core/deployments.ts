import {
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_GOERLI_TESTNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
} from './consts';
import {
  AzraelVersion,
  RenftContractType,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
} from './types';

export const DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
  contractType: RenftContractType.AZRAEL,
  network: NETWORK_ETHEREUM_MAINNET,
  startBlock: 12875508,
  version: AzraelVersion.V0,
} as const;

export const DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_ETHEREUM_MAINNET,
  startBlock: 13197348,
  version: SylvesterVersion.V0,
} as const;

export const DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0 = {
  contractAddress: '0xEDe9A15388CCd972DffBD7C3F5504345703b63b2',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_ETHEREUM_GOERLI_TESTNET,
  startBlock: 8907139,
  version: SylvesterVersion.V0,
} as const;

// @deprecated - Please use the v1 contract below.
export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0 = {
  contractAddress: '0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 28399140,
  version: SylvesterVersion.V0,
} as const;

export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1 = {
  contractAddress: '0x4e52B73Aa28b7FF84d88eA3A90C0668f46043450',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 36825974,
  version: SylvesterVersion.V1,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084',
  contractType: RenftContractType.WHOOPI,
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  startBlock: 11500156,
  version: WhoopiVersion.V0,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
  contractType: RenftContractType.WHOOPI,
  network: NETWORK_AVALANCHE_MAINNET,
  startBlock: 19408332,
  version: WhoopiVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x945E589A4715d1915e6FE14f08e4887Bc4019341',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_ETHEREUM_MAINNET,
  startBlock: 12875506,
  version: ResolverVersion.V0,
} as const;

// note that this resolver actually allows us to change already set
// payment tokens. that is its only difference from the prod v0 resolver
// this is useful if an integrating project wishes to change their erc20
export const DEPLOYMENT_RESOLVER_ETHEREUM_GOERLI_TESTNET_V0 = {
  contractAddress: '0xF8834327e7f3f5103954E477A32dC742A6518A9C',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_ETHEREUM_GOERLI_TESTNET,
  startBlock: 8907116,
  version: ResolverVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0 = {
  contractAddress: '0x6884d88Ce56C5C93F46eE23684eBA8628c90B518',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 28399112,
  version: ResolverVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1 = {
  contractAddress: '0x3ddC85bB768A11B0125f4ee71CfeA54e54653366',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 36825213,
  version: ResolverVersion.V1,
} as const;

export const DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  startBlock: 11500156,
  version: ResolverVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_AVALANCHE_MAINNET,
  startBlock: 19408332,
  version: ResolverVersion.V0,
} as const;

export function isValidContractVersion({
  contractType,
  version,
}: {
  contractType: RenftContractType;
  version: string;
}): boolean {
  switch (contractType) {
    case RenftContractType.RESOLVER:
      return Object.values(ResolverVersion).includes(
        version as ResolverVersion
      );
    case RenftContractType.WHOOPI:
      return Object.values(WhoopiVersion).includes(version as WhoopiVersion);
    case RenftContractType.AZRAEL:
      return Object.values(AzraelVersion).includes(version as AzraelVersion);
    case RenftContractType.SYLVESTER:
      return Object.values(SylvesterVersion).includes(
        version as SylvesterVersion
      );
    default:
      return false;
  }
}
