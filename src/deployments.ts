import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import isEqual from 'react-fast-compare';

import {
  CONTRACT_ABI_VERSIONS,
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
  NETWORK_ETHEREUM_GOERLI_TESTNET,
} from './consts';
import { createInterfaceVersions } from './interfaces';
import {
  AbstractRenftContractDeployment,
  AzraelVersion,
  RenftContractDeployment,
  RenftContractDeployments,
  RenftContractType,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
  CreateVersionedContractInterfaceResult,
  EVMNetworkType,
} from './types';
import { getAddress } from '@ethersproject/address';

export const DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.AZRAEL,
  version: AzraelVersion.V0,
  startBlock: 12875508,
} as const;

export const DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
  startBlock: 13197348,
} as const;

export const DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0 = {
  contractAddress: '0xEDe9A15388CCd972DffBD7C3F5504345703b63b2',
  network: NETWORK_ETHEREUM_GOERLI_TESTNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
  startBlock: 8907139,
} as const;

// @deprecated - Please use the v1 contract below.
export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0 = {
  contractAddress: '0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
  startBlock: 28399140,
} as const;

export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1 = {
  contractAddress: '0x4e52B73Aa28b7FF84d88eA3A90C0668f46043450',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V1,
  startBlock: 36825974,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.WHOOPI,
  version: WhoopiVersion.V0,
  startBlock: 11500156,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.WHOOPI,
  version: WhoopiVersion.V0,
  startBlock: 19408332,
} as const;

export const DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x945E589A4715d1915e6FE14f08e4887Bc4019341',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
  startBlock: 12875506,
} as const;

// note that this resolver actually allows us to change already set
// payment tokens. that is its only difference from the prod v0 resolver
// this is useful if an integrating project wishes to change their erc20
export const DEPLOYMENT_RESOLVER_ETHEREUM_GOERLI_TESTNET_V0 = {
  contractAddress: '0xF8834327e7f3f5103954E477A32dC742A6518A9C',
  network: NETWORK_ETHEREUM_GOERLI_TESTNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
  startBlock: 8907116,
} as const;

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0 = {
  contractAddress: '0x6884d88Ce56C5C93F46eE23684eBA8628c90B518',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
  startBlock: 28399112,
} as const;

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1 = {
  contractAddress: '0x3ddC85bB768A11B0125f4ee71CfeA54e54653366',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V1,
  startBlock: 36825213,
} as const;

export const DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
  startBlock: 11500156,
} as const;

export const DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
  startBlock: 19408332,
} as const;

export const RENFT_CONTRACT_DEPLOYMENTS: RenftContractDeployments = [
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1,
];

export function hasValidReNftContractType<T extends RenftContractDeployment>({
  contractType,
}: T): boolean {
  return Object.values(RenftContractType).includes(
    contractType as RenftContractType
  );
}

export function hasValidNetwork<T extends RenftContractDeployment>({
  network,
}: T): boolean {
  return (
    Object.values(EVMNetworkType).includes(network.type) && network.chainId > 0
  );
}

export function hasValidStartBlock<T extends RenftContractDeployment>({
  startBlock,
}: T): boolean {
  return startBlock >= 0;
}

export function hasValidContractAddress<T extends RenftContractDeployment>({
  contractAddress,
}: T): boolean {
  try {
    return getAddress(contractAddress) === contractAddress;
  } catch {
    return false;
  }
}

function isValidContractVersion({
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

export function hasValidContractVersion<T extends RenftContractDeployment>({
  contractType,
  version,
}: T): boolean {
  return isValidContractVersion({ contractType, version });
}

export function isValidDeployment<T extends RenftContractDeployment>(
  deployment: T
): boolean {
  const validityChecks = [
    hasValidContractAddress,
    hasValidReNftContractType,
    hasValidNetwork,
    hasValidStartBlock,
    hasValidContractVersion,
  ] as const;

  return validityChecks.every(check => check(deployment));
}

export function findSingleDeploymentOrThrow<T extends RenftContractDeployment>(
  search: Partial<T>
) {
  const [deployment, ...rest] = findDeployments<T>(search);

  if (!deployment)
    throw new Error(
      `[findSingleDeploymentOrThrow]: No deployment found for search: ${JSON.stringify(
        search
      )}`
    );
  if (rest.length)
    throw new Error(
      `[findSingleDeploymentOrThrow]: Multiple deployments found for search: ${JSON.stringify(
        search
      )}`
    );

  return deployment;
}

export function findDeployments<T extends RenftContractDeployment>(
  search: Partial<T>
) {
  return RENFT_CONTRACT_DEPLOYMENTS.filter(
    (
      maybeMatchingDeployment: RenftContractDeployment
    ): maybeMatchingDeployment is T => {
      const definedKeys = Object.keys(search);
      const filterObject = Object.fromEntries(
        Object.entries(maybeMatchingDeployment).filter(([k]) =>
          definedKeys.includes(k)
        )
      );
      return isEqual(filterObject, search);
    }
  );
}

// Find a single contract address for a given deployment. Will throw if none-or-many
// matching deployments are found.
export function getContractAddressForDeployment<
  T extends RenftContractDeployment
>(search: Omit<Partial<T>, 'contractAddress'>): string {
  const matchingDeployment = findSingleDeploymentOrThrow<T>(
    search as Partial<T>
  );

  const { contractAddress } = matchingDeployment!;

  return contractAddress;
}

export function getDeploymentAbi<T extends RenftContractType>({
  contractType,
  version,
}: {
  readonly contractType: T;
  readonly version: keyof CreateVersionedContractInterfaceResult[T];
}): ContractInterface {
  const contractAbiVersions = CONTRACT_ABI_VERSIONS[contractType];

  // @ts-expect-error versioning isn't deterministic at this point because we haven't strictly typed AbiVersions with InterfaceVersions.
  const maybeContractAbi = contractAbiVersions[version];

  if (!maybeContractAbi)
    throw new Error(
      `[getDeploymentAbi]: Unable to find abi for combination "${String(
        contractType
      )}", "${String(version)}".`
    );

  return maybeContractAbi;
}

export function getContractForDeployment<T extends RenftContractType>({
  contractAddress,
  contractType,
  version,
  signer,
}: {
  readonly contractAddress: string;
  readonly contractType: T;
  readonly version: keyof CreateVersionedContractInterfaceResult[T];
  readonly signer: Signer | null;
}): Contract {
  const abi = getDeploymentAbi({ contractType, version });

  return new Contract(contractAddress, abi, signer ?? undefined);
}

export function getRenftContract<
  ContractType extends keyof CreateVersionedContractInterfaceResult,
  Version extends keyof CreateVersionedContractInterfaceResult[ContractType]
>({
  deployment,
  signer,
}: {
  readonly deployment: AbstractRenftContractDeployment<ContractType, Version>;
  readonly signer: Signer | null;
}) {
  const {
    contractAddress,
    contractType,
    version,
    network: { type: networkType },
  } = deployment;

  const contract = getContractForDeployment({
    contractAddress,
    contractType,
    version,
    signer,
  });

  const { [contractType]: contractFunctions } = createInterfaceVersions(
    contract,
    networkType
  );

  return contractFunctions[version];
}
