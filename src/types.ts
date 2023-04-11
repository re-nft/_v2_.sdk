import { ContractInterface } from '@ethersproject/contracts';

import {
  AzraelInterfaceVersions,
  ResolverInterfaceVersions,
  SylvesterInterfaceVersions,
  WhoopiInterfaceVersions,
} from './contracts';

export enum EVMNetworkType {
  ETHEREUM_MAINNET = 'ETHEREUM_MAINNET',
  POLYGON_MAINNET = 'POLYGON_MAINNET',
  AVALANCHE_MAINNET = 'AVALANCHE_MAINNET',
  AVALANCHE_FUJI_TESTNET = 'AVALANCHE_FUJI_TESTNET',
}

export type EVMNetworkLike<T extends EVMNetworkType> = {
  readonly type: T;
  readonly chainId: number;
};

export type Network =
  // | SolanaNetwork
  EVMNetworkLike<EVMNetworkType>;

/**
 * @deprecated This enum is deprecated and will be removed in the next major release.
 * Should only be used internally.
 */
enum PaymentToken_Deprecated {
  SENTINEL = 0, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH = 1,
  DAI = 2,
  USDC = 3,
  USDT = 4,
  TUSD = 5,
  RENT = 6 /* reserved for when RENT token is deployed */,
  ACS = 7,
  WELT = 8,
  KNIGHT = 9,
  TOSHI = 10,
}

export type PaymentToken = typeof PaymentToken_Deprecated[keyof typeof PaymentToken_Deprecated];

let emittedWarning: boolean = false;

/**
 * @deprecated This Object is deprecated and will be removed in the next major release.
 * Please refer to the SDK documentation for further instructions.
 */
export const PaymentToken = new Proxy(PaymentToken_Deprecated, {
  get: (target, prop, _receiver) => {
    if (!emittedWarning) {
      console.warn(
        'PaymentToken enum is deprecated and will be removed in the next major release. Please refer to the SDK documentation for further instructions.'
      );
      emittedWarning = true;
    }

    return target[prop as keyof typeof target];
  },
});

export type PaymentTokenDetails = {
  address: String;
  scale: number;
};

export enum NFTStandard {
  E721 = 0,
  E1155 = 1,
}

// A RenftContractType represents a unique "style" of rental functionality:
//
// + Azrael: A collateralized rental; an up-front fee is required to prevent a renter from leaving a lender empty-handed.
// + Sylvester: A non-collateralized rental; have an escrow contract programmatically safeguard the safety of your asset.
// + Whoopi: A collateral-free rental; very similar to Sylvester, with an addition of whitelisting and reward share
//           features that facilitate guild-scholar management. Push approach to pay function.
//
// These contracts can be redeployed to new addresses and may be slightly modified to include new features
// and use cases. These are intended to be ideologically backwards-compatible, though their interfaces
// may not always be; (for example, smart contracts may expect the caller to provide additional arguments).
//
// Significantly new styles of rentals we implement in future will necessitate a new RenftContractType.
export enum RenftContractType {
  AZRAEL = 'AZRAEL',
  SYLVESTER = 'SYLVESTER',
  WHOOPI = 'WHOOPI',
  RESOLVER = 'RESOLVER',
}

export enum AzraelVersion {
  V0 = 'V0',
}

export enum WhoopiVersion {
  V0 = 'V0',
}

export enum SylvesterVersion {
  V0 = 'V0',
  V1 = 'V1',
}

export enum ResolverVersion {
  V0 = 'V0',
  V1 = 'V1',
}

export type RenftContractVersion =
  | AzraelVersion
  | WhoopiVersion
  | SylvesterVersion
  | ResolverVersion;

export type AbstractRenftContractDeployment<
  ContractType extends keyof CreateVersionedContractInterfaceResult,
  Version extends keyof CreateVersionedContractInterfaceResult[ContractType]
> = {
  readonly contractType: ContractType;
  readonly version: Version;
  readonly contractAddress: string;
  readonly network: Network;
};

export type AnyRenftContractDeployment<
  T extends keyof CreateVersionedContractInterfaceResult = keyof CreateVersionedContractInterfaceResult
> = AbstractRenftContractDeployment<
  T,
  keyof CreateVersionedContractInterfaceResult[T]
>;

// We need to relate contracts to their versions
type AbstractVersionedAbis<Version extends RenftContractVersion> = {
  readonly [key in Version]: ContractInterface;
};

export type AzraelAbiVersions = AbstractVersionedAbis<AzraelVersion>;
export type SylvesterAbiVersions = AbstractVersionedAbis<SylvesterVersion>;
export type WhoopiAbiVersions = AbstractVersionedAbis<WhoopiVersion>;
export type ResolverAbiVersions = AbstractVersionedAbis<ResolverVersion>;

export type ContractAbiVersions = {
  readonly [RenftContractType.AZRAEL]: AzraelAbiVersions;
  readonly [RenftContractType.SYLVESTER]: SylvesterAbiVersions;
  readonly [RenftContractType.WHOOPI]: WhoopiAbiVersions;
  readonly [RenftContractType.RESOLVER]: ResolverAbiVersions;
};

export type RenftAzraelDeployment = AbstractRenftContractDeployment<
  RenftContractType.AZRAEL,
  AzraelVersion
>;

export type RenftSylvesterDeployment = AbstractRenftContractDeployment<
  RenftContractType.SYLVESTER,
  SylvesterVersion
>;

export type RenftWhoopiDeployment = AbstractRenftContractDeployment<
  RenftContractType.WHOOPI,
  WhoopiVersion
>;

export type RenftResolverDeployment = AbstractRenftContractDeployment<
  RenftContractType.RESOLVER,
  ResolverVersion
>;

export type RenftContractDeployment =
  | RenftAzraelDeployment
  | RenftSylvesterDeployment
  | RenftWhoopiDeployment
  | RenftResolverDeployment;

export type RenftContractDeployments = readonly RenftContractDeployment[];

export type CreateVersionedContractInterfaceResult = {
  readonly [RenftContractType.AZRAEL]: AzraelInterfaceVersions;
  readonly [RenftContractType.SYLVESTER]: SylvesterInterfaceVersions;
  readonly [RenftContractType.WHOOPI]: WhoopiInterfaceVersions;
  readonly [RenftContractType.RESOLVER]: ResolverInterfaceVersions;
};

//// TODO: deprecate this
//export enum RenftContracts {
//  SYLVESTER = 0,
//  SYLVESTER_POLYGON = 1,
//  AZRAEL = 2,
//  WHOOPI_AVALANCHE = 3,
//  WHOOPI_FUJI = 4,
//}
