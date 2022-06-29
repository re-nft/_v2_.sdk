export enum PaymentToken {
  SENTINEL, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH,
  DAI,
  USDC,
  USDT,
  TUSD,
  ACS,
}

export type PaymentTokenDetails = {
  address: String;
  scale: number;
};

export enum NFTStandard {
  E721,
  E1155,
}

export enum RenftContracts {
  SYLVESTER,
  SYLVESTER_POLYGON,
  AZRAEL,
  WHOOPI_AVALANCHE,
  WHOOPI_FUJI,
}
