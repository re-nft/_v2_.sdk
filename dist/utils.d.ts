import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { PaymentToken, NFTStandard } from './types';
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
export declare const bytesToNibbles: (byteCount: number) => number;
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
export declare const toPaddedHex: (number: number, bitsize: number) => string;
/**
 * Converts a number into the format that is acceptable by the ReNFT contract.
 * TLDR; to fit a single storage slot in the ReNFT contract, we split the whole
 * and decimal parts of a number to only have maximum 4 digits. That means, the
 * maximum price is 9999.9999. If more decimals are supplied, they are truncated.
 * If price exceeds the maximum whole part, this throws.
 * @param price value to pack
 * @returns price format that is acceptable by ReNFT contract
 */
export declare const packPrice: (price: string | number) => string;
export declare const unpackPrice: (price: BigNumberish) => number;
declare type IObjectKeysValues = string[] | BigNumber[] | boolean[] | number[] | PaymentToken[];
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
export declare const prepareBatch: (args: PrepareBatch) => PrepareBatch;
export {};
