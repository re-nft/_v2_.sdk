import {Contract, ContractInterface} from '@ethersproject/contracts';
import {Signer} from '@ethersproject/abstract-signer';
import isEqual from 'react-fast-compare';


import {
  CONTRACT_ABI_VERSIONS,
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
} from './consts';
import {createInterfaceVersions} from './interfaces';
import {
  AbstractRenftContractDeployment,
  AzraelVersion,
  RenftAzraelDeployment,
  RenftContractDeployment,
  RenftContractDeployments,
  RenftContractType,
  RenftResolverDeployment,
  RenftSylvesterDeployment,
  RenftWhoopiDeployment,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
  CreateVersionedContractInterfaceResult,
} from './types';

export const DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0: RenftAzraelDeployment = {
  contractAddress: '0x94d8f036a0fbc216bb532d33bdf6564157af0cd7',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.AZRAEL,
  version: AzraelVersion.V0,
};

export const DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0: RenftSylvesterDeployment = {
  contractAddress: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
};

export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0: RenftSylvesterDeployment = {
  contractAddress: '0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
};

export const DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0: RenftWhoopiDeployment = {
  contractAddress: '0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.WHOOPI,
  version: WhoopiVersion.V0,
};

export const DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0: RenftWhoopiDeployment = {
  contractAddress: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.WHOOPI,
  version: WhoopiVersion.V0,
};

export const DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0: RenftResolverDeployment = {
  contractAddress: '0x945e589a4715d1915e6fe14f08e4887bc4019341',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
};

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0: RenftResolverDeployment = {
  contractAddress: '0x6884d88Ce56C5C93F46eE23684eBA8628c90B518',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
};

export const DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0: RenftResolverDeployment = {
  contractAddress: '0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
};

export const DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0: RenftResolverDeployment = {
  contractAddress: '0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
};

export const RENFT_CONTRACT_DEPLOYMENTS: RenftContractDeployments = [
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0,
];

export function findDeployments<T extends RenftContractDeployment>(search: Partial<T>) {
  return RENFT_CONTRACT_DEPLOYMENTS
    .filter(
      (maybeMatchingDeployment: RenftContractDeployment): maybeMatchingDeployment is T  => {
        const definedKeys = Object.keys(search);
        const filterObject = Object
          .fromEntries(
            Object.entries(maybeMatchingDeployment)
              .filter(([k]) => definedKeys.includes(k)),
          );
        return isEqual(filterObject, search);
      },
    );
}

// Find a single contract address for a given deployment. Will throw if none-or-many
// matching deployments are found.
export function getContractAddressForDeployment<T extends RenftContractDeployment>(
  search: Omit<Partial<T>, 'contractAddress'>,
): string {
  const matchingDeployments = findDeployments<T>(search as Partial<T>);

  if (!matchingDeployments.length)
    throw new Error(
      `[getContractAddressForDeployment]: Failed to find a matching deployment for search: ${
          JSON.stringify(search)
      }`
    );

  if (matchingDeployments.length > 1)
    throw new Error(
      `[getContractAddressForDeployment]: Found multiple possible deployments for search: ${
          JSON.stringify(search)
      }`
    );

  const [matchingDeployment] = matchingDeployments;

  const {contractAddress} = matchingDeployment!;

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
      `[getDeploymentAbi]: Unable to find abi for combination "${
        String(contractType)
      }", "${
        String(version)
      }".`,
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
  readonly signer: Signer;
}): Contract {
  const abi = getDeploymentAbi({contractType, version});

  return new Contract(contractAddress, abi, signer);
}

export function getRenftContract<
  ContractType extends keyof CreateVersionedContractInterfaceResult,
  Version extends keyof CreateVersionedContractInterfaceResult[ContractType],
>({
  deployment,
  signer,
}: {
  readonly deployment: AbstractRenftContractDeployment<ContractType, Version>;
  readonly signer: Signer;
}) {
  const {
    contractAddress,
    contractType,
    version, network: {type: networkType},
  } = deployment;

  const contract = getContractForDeployment({
    contractAddress,
    contractType,
    version,
    signer,
  });

  const {
    [contractType]: contractFunctions
  } = createInterfaceVersions(contract, networkType);

  return contractFunctions[version];
}
