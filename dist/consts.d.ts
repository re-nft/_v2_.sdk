import { AzraelAbiVersions, ContractAbiVersions, EVMNetworkType, EVMNetworkLike, PaymentToken, PaymentTokenDetails, ResolverAbiVersions, SylvesterAbiVersions, WhoopiAbiVersions } from './types';
export declare const NETWORK_ETHEREUM_MAINNET: EVMNetworkLike<EVMNetworkType.ETHEREUM_MAINNET>;
export declare const NETWORK_POLYGON_MAINNET: EVMNetworkLike<EVMNetworkType.POLYGON_MAINNET>;
export declare const NETWORK_AVALANCHE_FUJI_TESTNET: EVMNetworkLike<EVMNetworkType.AVALANCHE_FUJI_TESTNET>;
export declare const NETWORK_AVALANCHE_MAINNET: EVMNetworkLike<EVMNetworkType.AVALANCHE_MAINNET>;
export declare const AZRAEL_ABI_VERSIONS: AzraelAbiVersions;
export declare const SYLVESTER_ABI_VERSIONS: SylvesterAbiVersions;
export declare const WHOOPI_ABI_VERSIONS: WhoopiAbiVersions;
export declare const RESOLVER_ABI_VERSIONS: ResolverAbiVersions;
export declare const CONTRACT_ABI_VERSIONS: ContractAbiVersions;
export declare const MAX_PRICE = 9999.9999;
export declare const NUM_BITS_IN_BYTE = 8;
export declare const SENTINEL: PaymentTokenDetails;
export declare type PaymentTokenResolvers = {
    readonly [key in PaymentToken]: PaymentTokenDetails;
};
export declare type NetworkPaymentTokenResolvers = {
    readonly [key in EVMNetworkType]: PaymentTokenResolvers;
};
export declare const ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers;
export declare const POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers;
export declare const AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers;
export declare const AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS: PaymentTokenResolvers;
export declare const NETWORK_RESOLVERS: NetworkPaymentTokenResolvers;
export declare const ALL_NETWORKS: {
    readonly [key in EVMNetworkType]: EVMNetworkLike<key>;
};
