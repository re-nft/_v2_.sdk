import { NETWORK } from "./consts";

const GOERLI_RESOLVER = "";
const GOERLI_RENFT = "";

const KOVAN_RESOLVER = "";
const KOVAN_RENFT = "";

const RINKEBY_RESOLVER = "";
const RINKEBY_RENFT = "";

const ROPSTEN_RESOLVER = "";
const ROPSTEN_RENFT = "";

const MAINNET_RESOLVER = "";
const MAINNET_RENFT = "";

/**
 * Use NETWORK 'enum' in this file as an argument.
 * Or pass a chainID.
 *
 * @param chainID use NETWORK const, or pass the chainID yourself
 * @returns Resolver on the desired network.
 */
export const getResolverAddress = (chainID: number) => {
  switch (chainID) {
    case NETWORK.MAINNET:
      return MAINNET_RESOLVER;
    case NETWORK.ROPSTEN:
      return ROPSTEN_RESOLVER;
    case NETWORK.RINKEBY:
      return RINKEBY_RESOLVER;
    case NETWORK.GOERLI:
      return GOERLI_RESOLVER;
    case NETWORK.KOVAN:
      return KOVAN_RESOLVER;
    default:
      throw new Error("unknown network");
  }
};

/**
 * Use NETWORK 'enum' in this file as an argument.
 * Or pass a chainID.
 *
 * @param {number} chainID use NETWORK const, or pass the chainID yourself
 * @returns ReNFT address on the desired network.
 */
export const getReNFTAddress = (chainID: number) => {
  switch (chainID) {
    case NETWORK.MAINNET:
      return MAINNET_RENFT;
    case NETWORK.ROPSTEN:
      return ROPSTEN_RENFT;
    case NETWORK.RINKEBY:
      return RINKEBY_RENFT;
    case NETWORK.GOERLI:
      return GOERLI_RENFT;
    case NETWORK.KOVAN:
      return KOVAN_RENFT;
    default:
      throw new Error("unknown network");
  }
};
