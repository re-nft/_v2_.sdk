import {
  Chain,
  EVMNetworkLike,
  EVMNetworkType,
  PaymentToken,
  PaymentTokenDetails,
} from './types';

export const NETWORK_ETHEREUM_MAINNET: EVMNetworkLike<
  EVMNetworkType.ETHEREUM_MAINNET,
  Chain.ETHEREUM_MAINNET
> = {
  chainId: Chain.ETHEREUM_MAINNET,
  type: EVMNetworkType.ETHEREUM_MAINNET,
};

export const NETWORK_ETHEREUM_GOERLI_TESTNET: EVMNetworkLike<
  EVMNetworkType.ETHEREUM_GOERLI_TESTNET,
  Chain.ETHEREUM_GOERLI_TESTNET
> = {
  chainId: Chain.ETHEREUM_GOERLI_TESTNET,
  type: EVMNetworkType.ETHEREUM_GOERLI_TESTNET,
};

export const NETWORK_POLYGON_MAINNET: EVMNetworkLike<
  EVMNetworkType.POLYGON_MAINNET,
  Chain.POLYGON_MAINNET
> = {
  chainId: Chain.POLYGON_MAINNET,
  type: EVMNetworkType.POLYGON_MAINNET,
};

export const NETWORK_AVALANCHE_FUJI_TESTNET: EVMNetworkLike<
  EVMNetworkType.AVALANCHE_FUJI_TESTNET,
  Chain.AVALANCHE_FUJI_TESTNET
> = {
  chainId: Chain.AVALANCHE_FUJI_TESTNET,
  type: EVMNetworkType.AVALANCHE_FUJI_TESTNET,
};

export const NETWORK_AVALANCHE_MAINNET: EVMNetworkLike<
  EVMNetworkType.AVALANCHE_MAINNET,
  Chain.AVALANCHE_MAINNET
> = {
  chainId: Chain.AVALANCHE_MAINNET,
  type: EVMNetworkType.AVALANCHE_MAINNET,
};

// TODO: enforce this relationship with ContractTypes
// * Note, this price does not apply to Whoopi
export const MAX_PRICE = 9999.9999;
export const NUM_BITS_IN_BYTE = 8;
export const MAX_DECIMAL_LENGTH = 4;

// Resolver related
export const SENTINEL: PaymentTokenDetails = {
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
const ETHEREUM_TOSHI: PaymentTokenDetails = {
  address: '0xF136D7b0B7AE5b86D21E7B78DFA95375a7360f19',
  scale: 18,
};
const GOERLI_WETH: PaymentTokenDetails = {
  address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  scale: 18,
};
const GOERLI_DAI: PaymentTokenDetails = {
  address: '0x9D233A907E065855D2A9c7d4B552ea27fB2E5a36',
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
const POLYGON_WELT: PaymentTokenDetails = {
  address: '0x23E8B6A3f6891254988B84Da3738D2bfe5E703b9',
  scale: 18,
};
const POLYGON_KNIGHT: PaymentTokenDetails = {
  address: '0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D',
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
  [PaymentToken.RENT]: SENTINEL,
  [PaymentToken.ACS]: SENTINEL,
  [PaymentToken.WELT]: SENTINEL,
  [PaymentToken.KNIGHT]: SENTINEL,
  [PaymentToken.TOSHI]: ETHEREUM_TOSHI,
};

export const ETHEREUM_GOERLI_TESTNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: GOERLI_WETH,
  [PaymentToken.DAI]: GOERLI_DAI,
  // couldn't find anything decent on goerli for these
  [PaymentToken.USDC]: SENTINEL,
  [PaymentToken.USDT]: SENTINEL,
  [PaymentToken.TUSD]: SENTINEL,
  // ---
  [PaymentToken.RENT]: SENTINEL,
  [PaymentToken.ACS]: SENTINEL,
  [PaymentToken.WELT]: SENTINEL,
  [PaymentToken.KNIGHT]: SENTINEL,
  [PaymentToken.TOSHI]: SENTINEL,
};

export const POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: POLYGON_WETH,
  [PaymentToken.DAI]: POLYGON_DAI,
  [PaymentToken.USDC]: POLYGON_USDC,
  [PaymentToken.USDT]: POLYGON_USDT,
  [PaymentToken.TUSD]: POLYGON_TUSD,
  [PaymentToken.RENT]: SENTINEL,
  [PaymentToken.ACS]: SENTINEL,
  [PaymentToken.WELT]: POLYGON_WELT,
  [PaymentToken.KNIGHT]: POLYGON_KNIGHT,
  [PaymentToken.TOSHI]: SENTINEL,
};

export const AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: FUJI_WETH,
  [PaymentToken.DAI]: FUJI_DAI,
  [PaymentToken.USDC]: FUJI_USDC,
  [PaymentToken.USDT]: FUJI_USDT,
  [PaymentToken.TUSD]: FUJI_TUSD,
  [PaymentToken.RENT]: SENTINEL,
  [PaymentToken.ACS]: FUJI_ACS,
  [PaymentToken.WELT]: SENTINEL,
  [PaymentToken.KNIGHT]: SENTINEL,
  [PaymentToken.TOSHI]: SENTINEL,
};

export const AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers = {
  [PaymentToken.SENTINEL]: SENTINEL,
  [PaymentToken.WETH]: AVALANCHE_WETH,
  [PaymentToken.DAI]: AVALANCHE_DAI,
  [PaymentToken.USDC]: AVALANCHE_USDC,
  [PaymentToken.USDT]: AVALANCHE_USDT,
  [PaymentToken.TUSD]: AVALANCHE_TUSD,
  [PaymentToken.RENT]: SENTINEL,
  [PaymentToken.ACS]: AVALANCHE_ACS,
  [PaymentToken.WELT]: SENTINEL,
  [PaymentToken.KNIGHT]: SENTINEL,
  [PaymentToken.TOSHI]: SENTINEL,
};

// TODO: need to associate these with the resolver contract instance somehow
export const NETWORK_RESOLVERS: NetworkPaymentTokenResolvers = {
  [EVMNetworkType.ETHEREUM_MAINNET]: ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.ETHEREUM_GOERLI_TESTNET]: ETHEREUM_GOERLI_TESTNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.POLYGON_MAINNET]: POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.AVALANCHE_FUJI_TESTNET]: AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS,
  [EVMNetworkType.AVALANCHE_MAINNET]: AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS,
};

export const ALL_CHAINS: {
  readonly [key in Chain]: EVMNetworkLike<EVMNetworkType, Chain>;
} = {
  [Chain.ETHEREUM_MAINNET]: NETWORK_ETHEREUM_MAINNET,
  [Chain.ETHEREUM_GOERLI_TESTNET]: NETWORK_ETHEREUM_GOERLI_TESTNET,
  [Chain.POLYGON_MAINNET]: NETWORK_POLYGON_MAINNET,
  [Chain.AVALANCHE_FUJI_TESTNET]: NETWORK_AVALANCHE_FUJI_TESTNET,
  [Chain.AVALANCHE_MAINNET]: NETWORK_AVALANCHE_MAINNET,
};

export const ALL_NETWORKS: {
  readonly [key in EVMNetworkType]: EVMNetworkLike<key, Chain>;
} = {
  [EVMNetworkType.ETHEREUM_MAINNET]: NETWORK_ETHEREUM_MAINNET,
  [EVMNetworkType.ETHEREUM_GOERLI_TESTNET]: NETWORK_ETHEREUM_GOERLI_TESTNET,
  [EVMNetworkType.POLYGON_MAINNET]: NETWORK_POLYGON_MAINNET,
  [EVMNetworkType.AVALANCHE_FUJI_TESTNET]: NETWORK_AVALANCHE_FUJI_TESTNET,
  [EVMNetworkType.AVALANCHE_MAINNET]: NETWORK_AVALANCHE_MAINNET,
};
