import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { AbstractRenftContractDeployment, AzraelVersion, RenftContractDeployment, RenftContractDeployments, RenftContractType, ResolverVersion, SylvesterVersion, WhoopiVersion, CreateVersionedContractInterfaceResult } from './types';
export declare const DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0: {
    readonly contractAddress: "0x94d8f036a0fbc216bb532d33bdf6564157af0cd7";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.ETHEREUM_MAINNET>;
    readonly contractType: RenftContractType.AZRAEL;
    readonly version: AzraelVersion;
};
export declare const DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0: {
    readonly contractAddress: "0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.ETHEREUM_MAINNET>;
    readonly contractType: RenftContractType.SYLVESTER;
    readonly version: SylvesterVersion.V0;
};
export declare const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0: {
    readonly contractAddress: "0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.POLYGON_MAINNET>;
    readonly contractType: RenftContractType.SYLVESTER;
    readonly version: SylvesterVersion.V0;
};
export declare const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1: {
    readonly contractAddress: "0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.POLYGON_MAINNET>;
    readonly contractType: RenftContractType.SYLVESTER;
    readonly version: SylvesterVersion.V1;
};
export declare const DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0: {
    readonly contractAddress: "0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.AVALANCHE_FUJI_TESTNET>;
    readonly contractType: RenftContractType.WHOOPI;
    readonly version: WhoopiVersion;
};
export declare const DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0: {
    readonly contractAddress: "0x6Ee495ecEd3A0255057667FF2685e53f54A19A65";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.AVALANCHE_MAINNET>;
    readonly contractType: RenftContractType.WHOOPI;
    readonly version: WhoopiVersion;
};
export declare const DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0: {
    readonly contractAddress: "0x945e589a4715d1915e6fe14f08e4887bc4019341";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.ETHEREUM_MAINNET>;
    readonly contractType: RenftContractType.RESOLVER;
    readonly version: ResolverVersion;
};
export declare const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0: {
    readonly contractAddress: "0x6884d88Ce56C5C93F46eE23684eBA8628c90B518";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.POLYGON_MAINNET>;
    readonly contractType: RenftContractType.RESOLVER;
    readonly version: ResolverVersion;
};
export declare const DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0: {
    readonly contractAddress: "0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.AVALANCHE_FUJI_TESTNET>;
    readonly contractType: RenftContractType.RESOLVER;
    readonly version: ResolverVersion;
};
export declare const DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0: {
    readonly contractAddress: "0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A";
    readonly network: import("./types").EVMNetworkLike<import("./types").EVMNetworkType.AVALANCHE_MAINNET>;
    readonly contractType: RenftContractType.RESOLVER;
    readonly version: ResolverVersion;
};
export declare const RENFT_CONTRACT_DEPLOYMENTS: RenftContractDeployments;
export declare function findDeployments<T extends RenftContractDeployment>(search: Partial<T>): T[];
export declare function getContractAddressForDeployment<T extends RenftContractDeployment>(search: Omit<Partial<T>, 'contractAddress'>): string;
export declare function getDeploymentAbi<T extends RenftContractType>({ contractType, version, }: {
    readonly contractType: T;
    readonly version: keyof CreateVersionedContractInterfaceResult[T];
}): ContractInterface;
export declare function getContractForDeployment<T extends RenftContractType>({ contractAddress, contractType, version, signer, }: {
    readonly contractAddress: string;
    readonly contractType: T;
    readonly version: keyof CreateVersionedContractInterfaceResult[T];
    readonly signer: Signer | null;
}): Contract;
export declare function getRenftContract<ContractType extends keyof CreateVersionedContractInterfaceResult, Version extends keyof CreateVersionedContractInterfaceResult[ContractType]>({ deployment, signer, }: {
    readonly deployment: AbstractRenftContractDeployment<ContractType, Version>;
    readonly signer: Signer | null;
}): CreateVersionedContractInterfaceResult[ContractType][Version];
