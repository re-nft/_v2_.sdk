import { PaymentToken, Price, Nfts } from './types';
import { MAX_PRICE } from './consts';

const validateSameLength = (args: PrepareBatch) => {
  const nftsLen = args.nfts.nft.length;

  if (args.nfts.lendingIds) {
    if (nftsLen !== args.nfts.lendingIds.length)
      throw new Error('length mismatch');
  }
  if (nftsLen !== args.nfts.tokenIds.length) throw new Error('length mismatch');

  Object.keys(args).forEach(key => {
    if (key !== 'nfts') {
      //@ts-ignore
      if (args[key].length !== nftsLen) throw new Error('length mismatch');
    }
  });
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
  else price = num;
  const [whole, decimal] = price.split('.');

  if (parseInt(whole) > MAX_PRICE)
    throw new Error(`whole number exceeds allowed maximum ${MAX_PRICE}`);
  if (parseInt(whole) < 0) throw new Error(`whole number is negative`);
  if (decimal) {
    if (parseInt(decimal) > 99) throw new Error(`decimal number exceeds 99`);
  }

  return { whole: parseInt(whole), decimal: decimal ? parseInt(decimal) : 0 };
};

export const toNumber = (price: Price): number => {
  return parseFloat(`${price.whole}.${price.decimal}`);
};

interface PrepareBatch {
  nfts: Nfts;
  lendAmounts?: number[];
  maxRentDurations?: number[];
  dailyRentPrices?: Price[];
  collaterals?: Price[];
  paymentTokens?: PaymentToken[];
  rentDurations?: number[];
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
  if (args.nfts.nft.length <= 1) return args;
  validateSameLength(args);
  let preparedBatch: PrepareBatch = { nfts: { nft: [], tokenIds: [] } };

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

  const indices = sortIndices(args.nfts.nft);

  Object.keys(args).forEach(key => {
    // if nfts
    if (key === 'nfts') {
      preparedBatch.nfts.nft = sortWithIndices(args.nfts.nft, indices);
      preparedBatch.nfts.tokenIds = sortWithIndices(
        args.nfts.tokenIds,
        indices
      );
      if (args.nfts.lendingIds) {
        preparedBatch.nfts.lendingIds = sortWithIndices(
          args.nfts.lendingIds,
          indices
        );
      }
    } else {
      //@ts-ignore
      preparedBatch[key] = sortWithIndices(args[key], indices);
    }
  });

  return preparedBatch;
};
