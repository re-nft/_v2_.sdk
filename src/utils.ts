import { BigNumber } from "ethers";

import { PaymentToken } from "./types";
import { MAX_PRICE, NUM_BITS_IN_BYTE } from "./consts";

// consts that predominantly pertain to this file
const BITSIZE_MAX_VALUE = 32;
const HALF_BITSIZE = 16;

/**
 * hexchat is 0 to 15 which is 2 ** 4 - 1.
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
  if (typeof byteCount != "number") throw new Error("only numbers supported");
  if (byteCount < 1) throw new Error("invalid byteCount");
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
    throw `bitsize ${bitsize} above maximum value ${BITSIZE_MAX_VALUE}`;
  // conversion to unsigned form based on
  if (number < 0) throw new Error("unsigned number not supported");

  // 8 bits = 1 byteCount; 16 bits = 2 byteCount, ...
  const byteCount = Math.ceil(bitsize / NUM_BITS_IN_BYTE);

  // shifting 0 bits removes decimals
  // toString(16) converts into hex
  // .padStart(byteCount * 2, "0") adds byte
  return (
    "0x" +
    (number >>> 0)
      .toString(16)
      .toUpperCase()
      // 1 nibble = 4 bits. 1 byte = 2 nibbles
      .padStart(bytesToNibbles(byteCount), "0")
  );
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

  const parts = price.toString().split(".");
  const whole = Number(parts[0]);
  if (whole < 0) throw new Error("can't pack negative price");
  const wholeHex = toPaddedHex(Number(whole), HALF_BITSIZE);

  if (parts.length == 1) return wholeHex.concat("0000");
  if (parts.length != 2) throw new Error("price packing issue");

  let decimal = parts[1].slice(0, 4);

  return wholeHex.concat(toPaddedHex(Number(decimal), HALF_BITSIZE).slice(2));
};

type PrepareBatch = {
  nftAddress: string[],
  tokenID: BigNumber[],
  is721: boolean[],
  amount?: number[],
  maxRentDuration?: number[],
  dailyRentPrice?: string[],
  nftPrice?: string[],
  paymentToken?: PaymentToken[],
  rentDuration?: number[],
  lendingID?: BigNumber[]
}

/**
 * To spend as little gas as possible, arguments must follow a particular format
 * when passed to the contract. This function prepares whatever inputs you want
 * to send, and returns the inputs in an optimal format.
 * 
 * This algorithm's time complexity is pretty awful, and the "algorithm" itself better
 * not be seen by any human eyes. But, it will never run on too large arrays, so it
 * doesn't really matter. I am ashamed of it, yes.
 * @param args 
 */
export const prepareBatch = (args: PrepareBatch) => {
  let prev: any = args.nftAddress;
  const allVals = Object.values(args);

  for (const curr of allVals) {
    if (!curr) continue;
    if (curr.length !== prev.length) throw new Error("args lengths variable");
    prev = curr;
  }

  if (args.nftAddress.length == 1) return args;

  // all 1155s with the same address have to sit next to each other
  // their tokenIDs must be sorted in ascending order
  // everything else does not matter
  //@ts-ignore
  let uniqueNFTs: Map<string, Omit<PrepareBatch, 'nftAddress'>> = new Map();

  // O(N)
  const assignToMap = (nftAddress: string, i: number) => {
    // uses closure
    for (const [k, v] of Object.entries(args)) {
      if (k == "nftAddress") continue;
      if (!v) continue;
      const curr = uniqueNFTs.get(nftAddress);
      if (!curr) continue;
      //@ts-ignore
      curr[k].push(v[i])
    }
    return uniqueNFTs;
  }

  const worstArgsort = (tokenID: BigNumber[]) => {
    let _tokenID = JSON.parse(JSON.stringify(tokenID));
    _tokenID = _tokenID.map((v: {hex: string}) => (BigNumber.from(v.hex)))

    var len = _tokenID.length;
    var indices = new Array(len);
    for (var i = 0; i < len; ++i) indices[i] = i;

    indices.sort((a, b) => (tokenID[a].lt(tokenID[b]) ? -1 : tokenID[a].gt(tokenID[b]) ? 1 : 0));
    _tokenID = sortPerIndices(indices, _tokenID);

    return { sortedTokenID: _tokenID, argsort: indices };
  }

  // given an arr of indices and arr, returns arr in the order of indices
  const sortPerIndices = (sortedIndices: number[], arr: any[]) => {
    const sortedArr: any[] = [];
    for (const i of sortedIndices) sortedArr.push(arr[i]);
    return sortedArr;
  }

  // O(N)
  Object.values(args.nftAddress).forEach((k, i) => {
    if (uniqueNFTs.has(k)) {
      // if the nft is already in the map, simply append the arrays
      uniqueNFTs = assignToMap(k, i);
    } else {
      // create the entry and append
      uniqueNFTs.set(k, {
        tokenID: [args.tokenID[i]],
        is721: [args.is721[i]],
        amount: args.amount ? [args.amount[i]] : undefined,
        maxRentDuration: args.maxRentDuration ? [args.maxRentDuration[i]] : undefined,
        dailyRentPrice: args.dailyRentPrice ? [args.dailyRentPrice[i]] : undefined,
        nftPrice: args.nftPrice ? [args.nftPrice[i]] : undefined,
        paymentToken: args.paymentToken ? [args.paymentToken[i]] : undefined,
        rentDuration: args.rentDuration ? [args.rentDuration[i]] : undefined
      });
    }
  });

  // finally get the index args and reshuffle all the arrays
  //@ts-ignore
  const preparedBatch: PrepareBatch = {};
  const iterator = uniqueNFTs.keys();

  while (iterator) {
    const group = iterator.next().value;
    if (!group) break;
    const obj = uniqueNFTs.get(group);
    if (!obj) continue;
    const tokenID = obj.tokenID;
    const { sortedTokenID, argsort } = worstArgsort(tokenID);

    if (preparedBatch.nftAddress?.length > 0) {
      preparedBatch.nftAddress = preparedBatch.nftAddress.concat(...Array(sortedTokenID.length).fill(group));
    } else {
      preparedBatch.nftAddress = Array(sortedTokenID.length).fill(group);
    }

    if (preparedBatch.tokenID?.length > 0) {
      preparedBatch.tokenID = preparedBatch.tokenID.concat(...Array(sortedTokenID.length).fill(sortedTokenID));
    } else {
      preparedBatch.tokenID = sortedTokenID;
    }

    const allKeys = Object.keys(obj);
    for (const otherKey of allKeys) {
      if (otherKey == "tokenID") continue;
      //@ts-ignore
      if (!obj[otherKey]) continue;
      //@ts-ignore
      const sortedOther = sortPerIndices(argsort, obj[otherKey]);
      //@ts-ignore
      if (preparedBatch[otherKey]?.length > 0) {
        //@ts-ignore
        preparedBatch[otherKey] = preparedBatch[otherKey].concat(sortedOther);
      } else {
        //@ts-ignore
        preparedBatch[otherKey] = sortedOther;
      }
    }
  }

  return preparedBatch;
}
