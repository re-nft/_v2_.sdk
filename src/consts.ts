// struct Price { uint24 whole; uint8 decimal; }
export const MAX_PRICE = 16777215.99;

export const NETWORK = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  POLYGON: 137,
};

// todo: new addresses, plus different networks, so maybe something like
// { [NETWORK]: { collateral: { resolver: ..., renft: ... }, collateralFree: {} } }
export const RESOLVER = '<resolver address>';
export const RENFT = '<renft address>';
