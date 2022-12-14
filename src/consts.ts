import azrael_v0 from './abi/azrael.v0.abi.json';
import sylvester_v0 from './abi/sylvester.v0.abi.json';
import sylvester_v1 from './abi/sylvester.v1.abi.json';
import whoopi_v0 from './abi/whoopi.v0.abi.json';
import resolver_v0 from './abi/resolver.v0.abi.json';
import resolver_v1 from './abi/resolver.v1.abi.json';

import {
  AzraelAbiVersions,
  AzraelVersion,
  ContractAbiVersions,
  EVMNetworkType,
  EVMNetworkLike,
  PaymentToken,
  PaymentTokenDetails,
  RenftContractType,
  ResolverAbiVersions,
  ResolverVersion,
  SylvesterAbiVersions,
  SylvesterVersion,
  WhoopiAbiVersions,
  WhoopiVersion,
} from './types';

export const NETWORK_ETHEREUM_MAINNET: EVMNetworkLike<EVMNetworkType.ETHEREUM_MAINNET> = {
  type: EVMNetworkType.ETHEREUM_MAINNET,
  chainId: 1,
};

export const NETWORK_POLYGON_MAINNET: EVMNetworkLike<EVMNetworkType.POLYGON_MAINNET> = {
  type: EVMNetworkType.POLYGON_MAINNET,
  chainId: 137,
};

export const NETWORK_AVALANCHE_FUJI_TESTNET: EVMNetworkLike<EVMNetworkType.AVALANCHE_FUJI_TESTNET> = {
  type: EVMNetworkType.AVALANCHE_FUJI_TESTNET,
  chainId: 43_113,
};

export const NETWORK_AVALANCHE_MAINNET: EVMNetworkLike<EVMNetworkType.AVALANCHE_MAINNET> = {
  type: EVMNetworkType.AVALANCHE_MAINNET,
  chainId: 43_114,
};

export const AZRAEL_ABI_VERSIONS: AzraelAbiVersions = {
  [AzraelVersion.V0]: azrael_v0,
};

export const SYLVESTER_ABI_VERSIONS: SylvesterAbiVersions = {
  [SylvesterVersion.V0]: sylvester_v0,
  [SylvesterVersion.V1]: sylvester_v1,
};

export const WHOOPI_ABI_VERSIONS: WhoopiAbiVersions = {
  [WhoopiVersion.V0]: whoopi_v0,
};

export const RESOLVER_ABI_VERSIONS: ResolverAbiVersions = {
  [ResolverVersion.V0]: resolver_v0,
  [ResolverVersion.V1]: resolver_v1,
};

export const CONTRACT_ABI_VERSIONS: ContractAbiVersions = {
  [RenftContractType.AZRAEL]: AZRAEL_ABI_VERSIONS,
  [RenftContractType.SYLVESTER]: SYLVESTER_ABI_VERSIONS,
  [RenftContractType.WHOOPI]: WHOOPI_ABI_VERSIONS,
  [RenftContractType.RESOLVER]: RESOLVER_ABI_VERSIONS,
};

// TODO: enforce this relationship with ContractTypes
// * Note, this price does not apply to Whoopi
export const MAX_PRICE = 9999.9999;
export const NUM_BITS_IN_BYTE = 8;

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
  readonly [key in EVMNetworkType]: PaymentTokenResolvers;
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
  [EVMNetworkType.ETHEREUM_MAINNET]: ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.POLYGON_MAINNET]: POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.AVALANCHE_FUJI_TESTNET]: AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.AVALANCHE_MAINNET]: AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS,
};

//// @deprecated
//export const Resolvers: {
//  readonly [key in RenftContracts]: PaymentTokenResolvers;
//} = {
//  [RenftContracts.SYLVESTER]: NETWORK_RESOLVERS[EVMNetworkType.ETHEREUM_MAINNET],
//  [RenftContracts.SYLVESTER_POLYGON]: NETWORK_RESOLVERS[EVMNetworkType.POLYGON_MAINNET],
//  [RenftContracts.AZRAEL]: NETWORK_RESOLVERS[EVMNetworkType.ETHEREUM_MAINNET],
//  [RenftContracts.WHOOPI_AVALANCHE]: NETWORK_RESOLVERS[EVMNetworkType.AVALANCHE_MAINNET],
//  [RenftContracts.WHOOPI_FUJI]: NETWORK_RESOLVERS[EVMNetworkType.AVALANCHE_FUJI_TESTNET],
//};
