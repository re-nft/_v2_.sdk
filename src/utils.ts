import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import { PaymentToken, NFTStandard } from './types';
import { MAX_PRICE, NUM_BITS_IN_BYTE } from './consts';

// consts that predominantly pertain to this file
const BITSIZE_MAX_VALUE = 32;
const HALF_BITSIZE = 16;

const PRICE_BITSIZE = 32;

/**
 * hexchar is 0 to 15 which is 2 ** 4 - 1.
 * This means that hexchar (aka nibble) is half a byte,
 * since byte is 8 bits. This function converts number
 * of bytes to number of nibbles.
 *
 * e.g. 2 bytes is 4 nibbles
 *
 * @param byteCount
 * @returns number of nibbles that represent the byteCount bytes
 */
export const bytesToNibbles = (byteCount: number) => {
  if (typeof byteCount != 'number') throw new Error('only numbers supported');
  if (byteCount < 1) throw new Error('invalid byteCount');
  return byteCount * 2;
};

/**
 * (21.42, 32) -> 0x0015002A
 *
 * (1.2, 32)   -> 0x00010002
 *
 * Notice how the whole decimal part is reprsented by the first 4 nibbles,
 * whereas the decimal part is represented by the second part, i.e. the
 * last 4 nibbles
 *
 * @param number
 * @param bitsize
 * @returns number's padded (of bitsize total length) hex format
 */
export const toPaddedHex = (number: number, bitsize: number) => {
  // in node.js this function fails for bitsize above 32 bits
  if (bitsize > BITSIZE_MAX_VALUE)
    throw new Error(
      `bitsize ${bitsize} above maximum value ${BITSIZE_MAX_VALUE}`
    );
  // conversion to unsigned form based on
  if (number < 0) throw new Error('unsigned number not supported');

  // 8 bits = 1 byteCount; 16 bits = 2 byteCount, ...
  const byteCount = Math.ceil(bitsize / NUM_BITS_IN_BYTE);

  // shifting 0 bits removes decimals
  // toString(16) converts into hex
  // .padStart(byteCount * 2, "0") adds byte
  return (
    '0x' +
    (number >>> 0)
      .toString(16)
      .toUpperCase()
      // 1 nibble = 4 bits. 1 byte = 2 nibbles
      .padStart(bytesToNibbles(byteCount), '0')
  );
};

const scaleDecimal = (num: string) => {
  const numLen = num.length;
  const maxLen = 4;
  for (let i = 0; i < maxLen - numLen; i++) {
    num = num + '0';
  }
  return Number(num);
};

/**
 * Converts a number into the format that is acceptable by the ReNFT contract.
 * TLDR; to fit a single storage slot in the ReNFT contract, we split the whole
 * and decimal parts of a number to only have maximum 4 digits. That means, the
 * maximum price is 9999.9999. If more decimals are supplied, they are truncated.
 * If price exceeds the maximum whole part, this throws.
 * @param price value to pack
 * @returns price format that is acceptable by ReNFT contract
 */
export const packPrice = (price: string | number) => {
  if (price > MAX_PRICE) throw new Error(`supplied price exceeds ${MAX_PRICE}`);

  const parts = price.toString().split('.');
  const whole = Number(parts[0]);
  if (whole < 0) throw new Error("can't pack negative price");
  const wholeHex = toPaddedHex(Number(whole), HALF_BITSIZE);

  if (parts.length === 1) return wholeHex.concat('0000');
  if (parts.length !== 2) throw new Error('price packing issue');

  let decimal = scaleDecimal(parts[1].slice(0, 4));

  return wholeHex.concat(toPaddedHex(Number(decimal), HALF_BITSIZE).slice(2));
};

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

const decimalToPaddedHexString = (number: number, bitsize: number): string => {
  const byteCount = Math.ceil(bitsize / 8);
  const maxBinValue = Math.pow(2, bitsize) - 1;
  if (bitsize > 32) throw new Error('number above maximum value');
  if (number < 0) number = maxBinValue + number + 1;
  return (
    '0x' +
    (number >>> 0)
      .toString(16)
      .toUpperCase()
      .padStart(byteCount * 2, '0')
  );
};

export const unpackPrice = (price: BigNumberish) => {
  // price is from 1 to 4294967295. i.e. from 0x00000001 to 0xffffffff
  const numHex = decimalToPaddedHexString(Number(price), PRICE_BITSIZE).slice(
    2
  );
  let whole = parseInt(numHex.slice(0, 4), 16);
  let decimal = parseInt(numHex.slice(4), 16);
  if (whole > 9999) whole = 9999;
  if (decimal > 9999) decimal = 9999;

  let decimalStr = decimal.toString();
  const decimalLen = decimalStr.length;
  const maxLen = 4;
  for (let i = 0; i < maxLen - decimalLen; i++) {
    decimalStr = '0' + decimalStr;
  }

  const number = parseFloat(`${whole}.${decimalStr}`);
  return number;
};

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
  nftStandard?: NFTStandard[];
  nftAddress: string[];
  tokenID: BigNumber[];
  amount?: number[];
  maxRentDuration?: number[];
  dailyRentPrice?: string[];
  nftPrice?: string[];
  paymentToken?: PaymentToken[];
  rentDuration?: number[];
  lendingID?: BigNumber[];
  rentingID?: BigNumber[];
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
      nftStandard: args.nftStandard ? [args.nftStandard[i]] : undefined,
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
      rentingID: args.rentingID ? [args.rentingID[i]] : undefined,
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
