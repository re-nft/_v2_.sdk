import { ContractInterface } from '@ethersproject/contracts';
import { AzraelInterfaceVersions, ResolverInterfaceVersions, SylvesterInterfaceVersions, WhoopiInterfaceVersions } from './contracts';
export declare enum EVMNetworkType {
    ETHEREUM_MAINNET = "ETHEREUM_MAINNET",
    POLYGON_MAINNET = "POLYGON_MAINNET",
    AVALANCHE_MAINNET = "AVALANCHE_MAINNET",
    AVALANCHE_FUJI_TESTNET = "AVALANCHE_FUJI_TESTNET"
}
export declare type EVMNetworkLike<T extends EVMNetworkType> = {
    readonly type: T;
    readonly chainId: number;
};
export declare type Network = EVMNetworkLike<EVMNetworkType>;
export declare enum PaymentToken {
    SENTINEL = 0,
    WETH = 1,
    DAI = 2,
    USDC = 3,
    USDT = 4,
    TUSD = 5,
    ACS = 7
}
export declare type PaymentTokenDetails = {
    address: String;
    scale: number;
};
export declare enum NFTStandard {
    E721 = 0,
    E1155 = 1
}
export declare enum RenftContractType {
    AZRAEL = "AZRAEL",
    SYLVESTER = "SYLVESTER",
    WHOOPI = "WHOOPI",
    RESOLVER = "RESOLVER"
}
export declare enum AzraelVersion {
    V0 = "V0"
}
export declare enum WhoopiVersion {
    V0 = "V0"
}
export declare enum SylvesterVersion {
    V0 = "V0",
    V1 = "V1"
}
export declare enum ResolverVersion {
    V0 = "V0"
}
export declare type RenftContractVersion = AzraelVersion | WhoopiVersion | SylvesterVersion | ResolverVersion;
export declare type AbstractRenftContractDeployment<ContractType extends keyof CreateVersionedContractInterfaceResult, Version extends keyof CreateVersionedContractInterfaceResult[ContractType]> = {
    readonly contractType: ContractType;
    readonly version: Version;
    readonly contractAddress: string;
    readonly network: Network;
};
declare type AbstractVersionedAbis<Version extends RenftContractVersion> = {
    readonly [key in Version]: ContractInterface;
};
export declare type AzraelAbiVersions = AbstractVersionedAbis<AzraelVersion>;
export declare type SylvesterAbiVersions = AbstractVersionedAbis<SylvesterVersion>;
export declare type WhoopiAbiVersions = AbstractVersionedAbis<WhoopiVersion>;
export declare type ResolverAbiVersions = AbstractVersionedAbis<ResolverVersion>;
export declare type ContractAbiVersions = {
    readonly [RenftContractType.AZRAEL]: AzraelAbiVersions;
    readonly [RenftContractType.SYLVESTER]: SylvesterAbiVersions;
    readonly [RenftContractType.WHOOPI]: WhoopiAbiVersions;
    readonly [RenftContractType.RESOLVER]: ResolverAbiVersions;
};
export declare type RenftAzraelDeployment = AbstractRenftContractDeployment<RenftContractType.AZRAEL, AzraelVersion>;
export declare type RenftSylvesterDeployment = AbstractRenftContractDeployment<RenftContractType.SYLVESTER, SylvesterVersion>;
export declare type RenftWhoopiDeployment = AbstractRenftContractDeployment<RenftContractType.WHOOPI, WhoopiVersion>;
export declare type RenftResolverDeployment = AbstractRenftContractDeployment<RenftContractType.RESOLVER, ResolverVersion>;
export declare type RenftContractDeployment = RenftAzraelDeployment | RenftSylvesterDeployment | RenftWhoopiDeployment | RenftResolverDeployment;
export declare type RenftContractDeployments = readonly RenftContractDeployment[];
export declare type CreateVersionedContractInterfaceResult = {
    readonly [RenftContractType.AZRAEL]: AzraelInterfaceVersions;
    readonly [RenftContractType.SYLVESTER]: SylvesterInterfaceVersions;
    readonly [RenftContractType.WHOOPI]: WhoopiInterfaceVersions;
    readonly [RenftContractType.RESOLVER]: ResolverInterfaceVersions;
};
export {};
