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
