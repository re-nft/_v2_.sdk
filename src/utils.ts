import { BigNumber } from 'ethers';

import { PaymentToken, Price } from './types';
import { MAX_PRICE, UINT8_MAX } from './consts';

const sameLength = <T>(a: T[], b: T[]) => a.length === b.length;

const validateSameLength = (...args: any[]) => {
  let prev: any = args[0];
  for (const curr of args) {
    if (!curr) continue;
    if (!sameLength(prev, curr)) throw new Error('args length variable');
    prev = curr;
  }
  return true;
};

/**
 * v2 collateral renft smart contract models the prices as the following
 * struct: Price { uint24 whole; uint8 decimal }. This function converts
 * a string or a number into a Price object.
 * @param num value to typecase into Price
 * @returns price format that is acceptable by ReNFT contract
 */
export const toPrice = (num: string | number): Price => {
  let price: string = '';
  if (typeof num === 'number') price = num.toString();
  const [whole, decimal] = price.split('.');

  if (parseInt(whole) > MAX_PRICE) throw new Error(`whole number exceeds allowed maximum ${MAX_PRICE}`);
  if (parseInt(whole) < 0) throw new Error(`whole number is negative`);
  if (decimal) {
    if (parseInt(decimal) > UINT8_MAX) throw new Error(`decimal number exceeds uint8`);
  }

  return { whole: parseInt(whole), decimal: decimal ? parseInt(decimal) : 0 };
};

export const toNumber = (price: Price): number => {
  return parseFloat(`${price.whole}.${price.decimal}`)
}

type IObjectKeysValues =
  | string[]
  | BigNumber[]
  | boolean[]
  | number[]
  | PaymentToken[];

interface IObjectKeys {
  [key: string]: IObjectKeysValues | undefined;
}

interface PrepareBatch extends IObjectKeys {
  nftAddress: string[];
  tokenID: BigNumber[];
  amount?: number[];
  maxRentDuration?: number[];
  dailyRentPrice?: string[];
  nftPrice?: string[];
  paymentToken?: PaymentToken[];
  rentDuration?: number[];
  lendingID?: BigNumber[];
}

/**
 * To spend as little gas as possible, arguments must follow a particular format
 * when passed to the contract. This function prepares whatever inputs you want
 * to send, and returns the inputs in an optimal format.
 *
 * This algorithm's time complexity is pretty awful. But, it will never run on
 * large arrays, so it doesn't really matter.
 * @param args
 */
export const prepareBatch = (args: PrepareBatch) => {
  if (args.nftAddress.length === 1) return args;
  validateSameLength(Object.values(args));
  let nfts: Map<string, PrepareBatch> = new Map();
  const pb: PrepareBatch = { nftAddress: [], tokenID: [] };

  // O(N), maybe higher because of [...o[k]!, v[i]]
  const updateNfts = (nftAddress: string, i: number) => {
    const o = nfts.get(nftAddress);
    for (const [k, v] of Object.entries(args)) {
      if (!o) throw new Error(`could not find ${nftAddress}`);
      if (v) o[k] = [...(o[k] ?? []), v[i]] as IObjectKeysValues;
    }
    return nfts;
  };

  const createNft = (nftAddress: string, i: number) => {
    nfts.set(nftAddress, {
      nftAddress: [nftAddress],
      tokenID: [args.tokenID[i]],
      amount: args.amount ? [args.amount[i]] : undefined,
      maxRentDuration: args.maxRentDuration
        ? [args.maxRentDuration[i]]
        : undefined,
      dailyRentPrice: args.dailyRentPrice
        ? [args.dailyRentPrice[i]]
        : undefined,
      nftPrice: args.nftPrice ? [args.nftPrice[i]] : undefined,
      paymentToken: args.paymentToken ? [args.paymentToken[i]] : undefined,
      rentDuration: args.rentDuration ? [args.rentDuration[i]] : undefined,
      lendingID: args.lendingID ? [args.lendingID[i]] : undefined,
    });
    return nfts;
  };

  // O(2 * N), yikes to 2
  const worstArgsort = (tokenID: BigNumber[]) => {
    var indices = new Array(tokenID.length);
    for (var i = 0; i < tokenID.length; ++i) indices[i] = i;
    indices.sort((a, b) =>
      tokenID[a].lt(tokenID[b]) ? -1 : tokenID[a].gt(tokenID[b]) ? 1 : 0
    );
    return {
      sortedTokenID: sortPerIndices(indices, tokenID),
      argsort: indices,
    };
  };

  const sortPerIndices = (argsort: number[], arr: any[]) =>
    argsort.map(i => arr[i]);

  // O(N ** M). for each nft loop through all args. M - number of args
  Object.values(args.nftAddress).forEach((nft, i) => {
    if (nfts.has(nft)) nfts = updateNfts(nft, i);
    else nfts = createNft(nft, i);
  });

  const iterator = nfts.keys();
  // O(N * N)
  while (iterator) {
    const g = iterator.next().value;
    if (!g) break; // end of loop

    const nft = nfts.get(g) as PrepareBatch;
    const tokenID = nft.tokenID as BigNumber[];
    const { argsort } = worstArgsort(tokenID);

    for (const k of Object.keys(nft)) {
      if (!nft[k]) continue;
      const sorted = sortPerIndices(argsort, nft[k] ?? []) as IObjectKeysValues;
      pb[k] = [...(pb[k] ?? []), ...sorted] as IObjectKeysValues;
    }
  }

  return pb;
};
