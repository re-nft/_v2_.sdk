export enum EVMNetworkType {
  ETHEREUM_MAINNET = 'ETHEREUM_MAINNET',
  ETHEREUM_GOERLI_TESTNET = 'ETHEREUM_GOERLI_TESTNET',
  POLYGON_MAINNET = 'POLYGON_MAINNET',
  AVALANCHE_MAINNET = 'AVALANCHE_MAINNET',
  AVALANCHE_FUJI_TESTNET = 'AVALANCHE_FUJI_TESTNET',
}

export enum Chain {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_GOERLI_TESTNET = 5,
  POLYGON_MAINNET = 137,
  AVALANCHE_MAINNET = 43_114,
  AVALANCHE_FUJI_TESTNET = 43_113,
}

export type EVMNetworkLike<T extends EVMNetworkType, C extends Chain> = {
  readonly type: T;
  readonly chainId: C;
};

export type Network = EVMNetworkLike<EVMNetworkType, Chain>;

export enum PaymentToken {
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

export type PaymentTokenDetails = {
  address: string;
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

export type RenftContractVersions = {
  [RenftContractType.AZRAEL]: AzraelVersion;
  [RenftContractType.RESOLVER]: ResolverVersion;
  [RenftContractType.SYLVESTER]: SylvesterVersion;
  [RenftContractType.WHOOPI]: WhoopiVersion;
};

export type Deployment<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> = {
  abi: any;
  contractAddress: string;
  contractType: ContractType;
  network: Network;
  startBlock: number;
  version: ContractVersion;
};
