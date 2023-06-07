import { Signer } from '@ethersproject/abstract-signer';
import { getAddress } from '@ethersproject/address';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import isEqual from 'react-fast-compare';

import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1,
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  Deployments,
  EVMNetworkType,
  isValidContractVersion,
  RenftContractType,
} from '../core';
import { CONTRACT_ABI_VERSIONS } from './consts';
import { createInterfaceVersions } from './interfaces';
import { RenftContractDeployment } from './types';
import {
  AbstractRenftContractDeployment,
  CreateVersionedContractInterfaceResult,
} from './types';

export const RENFT_CONTRACT_DEPLOYMENTS: Deployments[] = [
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_GOERLI_TESTNET_V0,
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

export function findDeployments<T extends Deployments>(search: Partial<T>) {
  return RENFT_CONTRACT_DEPLOYMENTS.filter(
    (maybeMatchingDeployment: Deployments): maybeMatchingDeployment is T => {
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

export function findSingleDeploymentOrThrow<T extends Deployments>(
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

// Find a single contract address for a given deployment. Will throw if none-or-many
// matching deployments are found.
export function getContractAddressForDeployment<T extends Deployments>(
  search: Omit<Partial<T>, 'contractAddress'>
): string {
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

  // @ts-expect-error We can't infer the following yet.
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
    signer,
    version,
  });

  const { [contractType]: contractFunctions } = createInterfaceVersions(
    contract,
    networkType
  );

  return contractFunctions[version];
}
