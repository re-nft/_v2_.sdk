export enum PaymentToken {
  SENTINEL = 0, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH = 1,
  DAI = 2,
  USDC = 3,
  USDT = 4,
  TUSD = 5,
  ACS = 7, // 6 is reserved for the RENT token when it is released
}

export type PaymentTokenDetails = {
  address: String;
  scale: number;
};

export enum NFTStandard {
  E721 = 0,
  E1155 = 1,
}

export enum RenftContracts {
  SYLVESTER = 0,
  SYLVESTER_POLYGON = 1,
  AZRAEL = 2,
  WHOOPI_AVALANCHE = 3,
  WHOOPI_FUJI = 4,
}
