export enum PaymentToken {
  SENTINEL, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH,
  DAI,
  USDC,
  USDT,
  TUSD,
  RENT,
}

export enum NFTStandard {
  E721,
  E1155,
}
