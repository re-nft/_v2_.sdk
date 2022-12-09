import {Signer} from '@ethersproject/abstract-signer';
import {Contract, ContractInterface} from '@ethersproject/contracts';
import isEqual from 'react-fast-compare';

import {
  AbstractRenftContractDeployment,
  AzraelAbiVersions,
  AzraelVersion,
  ContractAbiVersions,
  EthereumNetworkLike,
  EthereumNetworkType,
  PaymentToken,
  PaymentTokenDetails,
  RenftAzraelDeployment,
  RenftContractDeployment,
  RenftContractDeployments,
  RenftContracts,
  RenftContractType,
  ResolverAbiVersions,
  ResolverVersion,
  SylvesterAbiVersions,
  SylvesterVersion,
  WhoopiAbiVersions,
  WhoopiVersion,
} from './types';

import azrael_v0 from './abi/azrael.v0.abi.json';
import sylvester_v0 from './abi/sylvester.v0.abi.json';
import whoopi_v0 from './abi/whoopi.v0.abi.json';
import resolver_v0 from './abi/resolver.v0.abi.json';
import {createInterfaceVersions, CreateVersionedContractInterfaceResult} from "./contracts2";

export const NETWORK_ETHEREUM_MAINNET: EthereumNetworkLike<
  EthereumNetworkType.ETHEREUM_MAINNET
> = {
  type: EthereumNetworkType.ETHEREUM_MAINNET,
  chainId: 1,
};

export const NETWORK_POLYGON_MAINNET: EthereumNetworkLike<
  EthereumNetworkType.POLYGON_MAINNET
> = {
  type: EthereumNetworkType.POLYGON_MAINNET,
  chainId: 137,
};

export const NETWORK_AVALANCHE_FUJI_TESTNET: EthereumNetworkLike<
  EthereumNetworkType.AVALANCHE_FUJI_TESTNET
> = {
  type: EthereumNetworkType.AVALANCHE_FUJI_TESTNET,
  chainId: 43_113,
};

export const NETWORK_AVALANCHE_MAINNET: EthereumNetworkLike<
  EthereumNetworkType.AVALANCHE_MAINNET
> = {
  type: EthereumNetworkType.AVALANCHE_MAINNET,
  chainId: 43_114,
};

export const DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0: RenftAzraelDeployment = {
  contractAddress: '0x94d8f036a0fbc216bb532d33bdf6564157af0cd7',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.AZRAEL,
  version: AzraelVersion.V0,
};

export const DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
} as const;

export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0 = {
  contractAddress: '0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.SYLVESTER,
  version: SylvesterVersion.V0,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.WHOOPI,
  version: WhoopiVersion.V0,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.WHOOPI,
  version: WhoopiVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x945e589a4715d1915e6fe14f08e4887bc4019341',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0 = {
  contractAddress: '0x6884d88Ce56C5C93F46eE23684eBA8628c90B518',
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
} as const;

export const DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.RESOLVER,
  version: ResolverVersion.V0,
} as const;

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

export const AZRAEL_ABI_VERSIONS: AzraelAbiVersions = {
  [AzraelVersion.V0]: azrael_v0,
};

export const SYLVESTER_ABI_VERSIONS: SylvesterAbiVersions = {
  [SylvesterVersion.V0]: sylvester_v0,
};

export const WHOOPI_ABI_VERSIONS: WhoopiAbiVersions = {
  [WhoopiVersion.V0]: whoopi_v0,
};

export const RESOLVER_ABI_VERSIONS: ResolverAbiVersions = {
  [ResolverVersion.V0]: resolver_v0,
};

export const CONTRACT_ABI_VERSIONS: ContractAbiVersions = {
  [RenftContractType.AZRAEL]: AZRAEL_ABI_VERSIONS,
  [RenftContractType.SYLVESTER]: SYLVESTER_ABI_VERSIONS,
  [RenftContractType.WHOOPI]: WHOOPI_ABI_VERSIONS,
  [RenftContractType.RESOLVER]: RESOLVER_ABI_VERSIONS,
};

// Attempts to find matching deployments for a given set of deployment properties.
// For example, it allows callers to search for all deployments for a given network,
// or of a specific contractType and version.
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
  readonly version: RenftContractDeployment['version'];
}): ContractInterface {
  const contractAbiVersions = CONTRACT_ABI_VERSIONS[contractType];
  const maybeContractAbi = contractAbiVersions?.[version];

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
  readonly version: RenftContractDeployment['version'];
  readonly signer: Signer;
}): Contract {

  const abi = getDeploymentAbi({contractType, version});

  return new Contract(contractAddress, abi, signer);
}

export function getVersionedContractInterfaceForDeployment<
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
    version,
  } = deployment;

  const contract = getContractForDeployment({
    contractAddress,
    contractType,
    // @ts-ignore
    version,
    signer,
  });

  const {
    [contractType]: contractFunctions
  } = createInterfaceVersions(contract);

  return contractFunctions[version];
}

// TODO: enforce this relationship with ContractTypes
// * Note, this price does not apply to Whoopi
export const MAX_PRICE = 9999.9999;
export const NUM_BITS_IN_BYTE = 8;

export const ResolverAddress = getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.RESOLVER,
});

export const ResolverPolygonAddress = getContractAddressForDeployment({
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.RESOLVER,
});

export const ResolverFujiAddress = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.RESOLVER,
});

export const ResolverAvalancheAddress = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.RESOLVER,
});

// TODO: DEPRECATE THESE WITH WARNING
export const AzraelAddress = getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.AZRAEL,
});

export const SylvesterAddress = getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: RenftContractType.SYLVESTER,
});

export const SylvesterPolygonAddress = getContractAddressForDeployment({
  network: NETWORK_POLYGON_MAINNET,
  contractType: RenftContractType.SYLVESTER,
});

export const WhoopiFujiAddress = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: RenftContractType.WHOOPI,
});

export const WhoopiAvalancheAddress = getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: RenftContractType.WHOOPI,
});

// Resolver related
const SENTINEL: PaymentTokenDetails = {
  address: '',
  scale: 0,
};
const ETHEREUM_WETH: PaymentTokenDetails = {
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  scale: 18,
};
const ETHEREUM_DAI: PaymentTokenDetails = {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  scale: 18,
};
const ETHEREUM_USDC: PaymentTokenDetails = {
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  scale: 6,
};
const ETHEREUM_USDT: PaymentTokenDetails = {
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  scale: 6,
};
const ETHEREUM_TUSD: PaymentTokenDetails = {
  address: '0x0000000000085d4780B73119b644AE5ecd22b376',
  scale: 18,
};
const POLYGON_WETH: PaymentTokenDetails = {
  address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  scale: 18,
};
const POLYGON_DAI: PaymentTokenDetails = {
  address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  scale: 18,
};
const POLYGON_USDC: PaymentTokenDetails = {
  address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  scale: 6,
};
const POLYGON_USDT: PaymentTokenDetails = {
  address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  scale: 6,
};
const POLYGON_TUSD: PaymentTokenDetails = {
  address: '0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756',
  scale: 18,
};
const FUJI_WETH: PaymentTokenDetails = {
  address: '0x40E71a970Ff1fbd21A53b4d2dbc102Be0E1d574f', // couldn't find weth on fuji, so this is dai
  scale: 18,
};
const FUJI_DAI: PaymentTokenDetails = {
  address: '0x40E71a970Ff1fbd21A53b4d2dbc102Be0E1d574f',
  scale: 18,
};
const FUJI_USDC: PaymentTokenDetails = {
  address: '0x43CDA502069B1dFa4f7C1a1625Bc6be47cD0bD88',
  scale: 6,
};
const FUJI_USDT: PaymentTokenDetails = {
  address: '0x051DE28a8B5836f678A13d19EE7F8c167b4Ca54D',
  scale: 6,
};
const FUJI_TUSD: PaymentTokenDetails = {
  address: '0x051DE28a8B5836f678A13d19EE7F8c167b4Ca54D', // couldn't find tusd on fuji, so this is usdt
  scale: 6,
};
const FUJI_ACS: PaymentTokenDetails = {
  address: '0x4a590276DA8E8d660f8ef638464c2D1DF40cEAbA',
  scale: 18,
};
const AVALANCHE_WETH: PaymentTokenDetails = {
  address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  scale: 18,
};
const AVALANCHE_DAI: PaymentTokenDetails = {
  address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  scale: 18,
};
const AVALANCHE_USDC: PaymentTokenDetails = {
  address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  scale: 6,
};
const AVALANCHE_USDT: PaymentTokenDetails = {
  address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  scale: 6,
};
const AVALANCHE_TUSD: PaymentTokenDetails = {
  address: '0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB',
  scale: 18,
};
const AVALANCHE_ACS: PaymentTokenDetails = {
  address: '0x18fC6360E83FE91404d47Ea4400A221dfbBACF06',
  scale: 18,
};

export type PaymentTokenResolvers = {
  readonly [key in PaymentToken]: PaymentTokenDetails;
};

export type NetworkPaymentTokenResolvers = {
  readonly [key in EthereumNetworkType]: PaymentTokenResolvers;
};

export const ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: ETHEREUM_WETH,
  [PaymentToken.DAI]: ETHEREUM_DAI,
  [PaymentToken.USDC]: ETHEREUM_USDC,
  [PaymentToken.USDT]: ETHEREUM_USDT,
  [PaymentToken.TUSD]: ETHEREUM_TUSD,
  [PaymentToken.ACS]: SENTINEL,
};

export const POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: POLYGON_WETH,
  [PaymentToken.DAI]: POLYGON_DAI,
  [PaymentToken.USDC]: POLYGON_USDC,
  [PaymentToken.USDT]: POLYGON_USDT,
  [PaymentToken.TUSD]: POLYGON_TUSD,
  [PaymentToken.ACS]: SENTINEL,
};

export const AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: FUJI_WETH,
  [PaymentToken.DAI]: FUJI_DAI,
  [PaymentToken.USDC]: FUJI_USDC,
  [PaymentToken.USDT]: FUJI_USDT,
  [PaymentToken.TUSD]: FUJI_TUSD,
  [PaymentToken.ACS]: FUJI_ACS,
};

export const AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: AVALANCHE_WETH,
  [PaymentToken.DAI]: AVALANCHE_DAI,
  [PaymentToken.USDC]: AVALANCHE_USDC,
  [PaymentToken.USDT]: AVALANCHE_USDT,
  [PaymentToken.TUSD]: AVALANCHE_TUSD,
  [PaymentToken.ACS]: AVALANCHE_ACS,
};

// TODO: need to associate these with the resolver contract instance somehow
export const NETWORK_RESOLVERS: NetworkPaymentTokenResolvers = {
  [EthereumNetworkType.ETHEREUM_MAINNET]: ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS,
  [EthereumNetworkType.POLYGON_MAINNET]: POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS,
  [EthereumNetworkType.AVALANCHE_FUJI_TESTNET]: AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS,
  [EthereumNetworkType.AVALANCHE_MAINNET]: AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS,
};

// @deprecated
export const Resolvers: {
  readonly [key in RenftContracts]: PaymentTokenResolvers;
} = {
  [RenftContracts.SYLVESTER]: NETWORK_RESOLVERS[EthereumNetworkType.ETHEREUM_MAINNET],
  [RenftContracts.SYLVESTER_POLYGON]: NETWORK_RESOLVERS[EthereumNetworkType.POLYGON_MAINNET],
  [RenftContracts.AZRAEL]: NETWORK_RESOLVERS[EthereumNetworkType.ETHEREUM_MAINNET],
  [RenftContracts.WHOOPI_AVALANCHE]: NETWORK_RESOLVERS[EthereumNetworkType.AVALANCHE_MAINNET],
  [RenftContracts.WHOOPI_FUJI]: NETWORK_RESOLVERS[EthereumNetworkType.AVALANCHE_FUJI_TESTNET],
};
