import { BigNumberish } from '@ethersproject/bignumber';

import { NFTStandard, PaymentToken } from './types';
import {
  MAX_DECIMAL_LENGTH,
  MAX_PRICE,
  NUM_BITS_IN_BYTE,
} from './consts';

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
  for (let i = 0; i < MAX_DECIMAL_LENGTH - numLen; i++) {
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

  if (parts[1].length > MAX_DECIMAL_LENGTH)
    throw new Error(
      `supplied price exceeds decimal length of ${MAX_DECIMAL_LENGTH}`
    );

  let decimal = scaleDecimal(parts[1].slice(0, MAX_DECIMAL_LENGTH));

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

/**
 * To save as much gas as possible, we have decided to pack the rental
 * price tightly in the Lending struct in our contract. For this purpose,
 * we have decided to use 4 bytes to express the price. Leading two bytes
 * are used to signify the whole part of the price and the last two bytes
 * are used to signify the decimal part of the price. This function deals
 * with converting the packed price back to the human readable price.
 * @param price packed price to convert to human readable price
 */
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

  return parseFloat(`${whole}.${decimalStr}`);
};

type IObjectKeysValues = string[] | boolean[] | number[] | PaymentToken[];

interface IObjectKeys {
  [key: string]: IObjectKeysValues | undefined;
}

interface PrepareBatch extends IObjectKeys {
  nftStandard?: NFTStandard[];
  nftAddress: string[];
  tokenID: string[];
  amount?: number[];
  maxRentDuration?: number[];
  dailyRentPrice?: string[];
  nftPrice?: string[];
  paymentToken?: PaymentToken[];
  rentDuration?: number[];
  lendingID?: string[];
  rentingID?: string[];
  rentAmount?: string[];
}

/**
 * Our contracts take arrays of NFT addresses, their token ids, and other
 * relevant informatino for lending / renting. Contract assumes a specific
 * ordering for these. That is how we achieve minimal gas usage. This function
 * facilitates that ordering. In a nutshell, it puts all the ERC721s together,
 * followed by ERC1155s, which also sit next to each other in the sorted array.
 * This helps our contracts with calling the ERC1155's bundle transfer, and
 * that is yet another gas saving trick.
 *
 * To spend as little gas as possible, arguments must follow a particular format
 * when passed to the contract. This function prepares whatever inputs you want
 * to send, and returns the inputs in an optimal format.
 *
 * This algorithm's time complexity is pretty awful. But, it will never run on
 * large arrays, so it doesn't really matter.
 * @param args arguments that the client is intending to call the contracts
 * with.
 */
export const prepareBatch = (args: PrepareBatch) => {
  if (args.nftAddress.length <= 1) return args;
  validateSameLength(args);
  let preparedBatch: PrepareBatch = { nftAddress: [], tokenID: [] };

  // input:  ['a', 'b', 'a', 'c']
  // output: [0, 2, 1, 3]
  const sortIndices = (nft: string[]): number[] => {
    const comp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
    const indices = new Array(nft.length).fill(0).map((_, i) => i);
    return indices.sort((a, b) => comp(nft[a], nft[b]));
  };

  const sortWithIndices = (items: any[], indices: number[]) => {
    return indices.map(i => items[i]);
  };

  const indices = sortIndices(args.nftAddress);

  Object.keys(args).forEach(key => {
    //@ts-ignore
    preparedBatch[key] = sortWithIndices(args[key], indices);
  });

  return preparedBatch;
};
