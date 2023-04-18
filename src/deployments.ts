import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import isEqual from 'react-fast-compare';
import { z } from 'zod';

import {
  CONTRACT_ABI_VERSIONS,
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
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

export const DeploymentSchema = z.object({
  contractAddress: z
    .string()
    .transform((address: string) => getAddress(address)),
  network: z.object({
    chainId: z.number(),
    type: z.nativeEnum(EVMNetworkType),
  }),
  contractType: z.nativeEnum(RenftContractType),
  version: z
    .nativeEnum(ResolverVersion)
    .or(z.nativeEnum(AzraelVersion))
    .or(z.nativeEnum(SylvesterVersion))
    .or(z.nativeEnum(WhoopiVersion)),
  startBlock: z.number().min(0),
});

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

export function isValidDeployment<T extends RenftContractDeployment>(
  deployment: T
): boolean {
  try {
    return !!DeploymentSchema.parse(deployment);
  } catch (e) {
    console.warn(e);

    return false;
  }
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
