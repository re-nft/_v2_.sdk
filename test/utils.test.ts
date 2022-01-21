import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { PaymentToken } from '../src/types';

import { toPrice, toNumber, prepareBatch } from '../src/utils';

describe('Utils', () => {
  it('produces Price { whole: 10, decimal: 11 }', () => {
    const price = toPrice(10.11);
    expect(price).to.deep.equal({ whole: 10, decimal: 11 });
  });

  it('throws if exceeds MAX_PRICE', () => {
    expect(() => {
      toPrice(16777216);
    }).to.throw();
  });

  it('throws if exceeds MAX_PRICE by one decimal', () => {
    // * note that 100 would work, since it's considered to be '.01'
    expect(() => {
      toPrice(16777215.101);
    }).to.throw();
  });

  it('produces Price { whole: 10, decimal: 11 } from "10.11"', () => {
    const price = toPrice('10.11');
    expect(price).to.deep.equal({ whole: 10, decimal: 11 });
  });

  it('produces Price { whole: 1, decimal: 1 } from 1.01', () => {
    const price = toPrice(1.01);
    expect(price).to.deep.equal({ whole: 1, decimal: 1 });
  });

  it('produces Price { whole: 1, decimal: 10 } from 1.1', () => {
    const price = toPrice(1.1);
    expect(price).to.deep.equal({ whole: 1, decimal: 10 });
  });

  it('produces Price { whole: 1, decimal: 1 } from "1.01"', () => {
    const price = toPrice('1.01');
    expect(price).to.deep.equal({ whole: 1, decimal: 1 });
  });

  it('produces Price { whole: 1, decimal: 10 } from "1.1"', () => {
    const price = toPrice('1.1');
    expect(price).to.deep.equal({ whole: 1, decimal: 10 });
  });

  it('produces Price { whole: 0, decimal: 0}', () => {
    const price = toPrice(0.0);
    expect(price).to.deep.equal({ whole: 0, decimal: 0 });
  });

  it('produces Price { whole: 0, decimal: 0} from string', () => {
    const price = toPrice('0.0');
    expect(price).to.deep.equal({ whole: 0, decimal: 0 });
  });

  it('produces 0 from Price { whole: 0, decimal: 0 }', () => {
    const price = { whole: 0, decimal: 0 };
    const number = toNumber(price);
    expect(number).to.be.equal(0);
  });

  it('produces 1.23 from Price { whole: 1, decimal: 23 }', () => {
    const price = { whole: 1, decimal: 23 };
    const number = toNumber(price);
    expect(number).to.be.equal(1.23);
  });

  it('produces 0.01 from Price { whole: 0, decimal: 1 }', () => {
    const price = { whole: 0, decimal: 1 };
    const number = toNumber(price);
    expect(number).to.be.equal(0.01);
  });

  it('produces 0.1 from Price { whole: 0, decimal: 10 }', () => {
    const price = { whole: 0, decimal: 10 };
    const number = toNumber(price);
    expect(number).to.be.equal(0.1);
  });

  it('batch - single item return', () => {
    const lendThis = {
      nfts: { nft: ['A'], tokenIds: [BigNumber.from('1')] },
    };
    const prepd = prepareBatch(lendThis);
    expect(prepd).to.deep.equal(lendThis);
  });

  it('batch - domain #1', () => {
    const prepd = prepareBatch({
      nfts: {
        nft: ['A', 'B', 'C', 'A'],
        tokenIds: [
          BigNumber.from('10'),
          BigNumber.from('1'),
          BigNumber.from('2'),
          BigNumber.from('2'),
        ],
      },
    });

    // indices = [0, 3, 1, 2]

    expect(prepd).to.deep.equal({
      nfts: {
        nft: ['A', 'A', 'B', 'C'],
        tokenIds: [
          BigNumber.from('10'),
          BigNumber.from('2'),
          BigNumber.from('1'),
          BigNumber.from('2'),
        ],
      },
    });
  });

  it('batch - domain #2', () => {
    const prepd = prepareBatch({
      nfts: {
        nft: ['A', 'B', 'C', 'A', 'D', 'A'],
        tokenIds: [
          BigNumber.from('2'),
          BigNumber.from('1'),
          BigNumber.from('2'),
          BigNumber.from('10'),
          BigNumber.from('22'),
          BigNumber.from('3'),
        ],
      },
      lendAmounts: [2, 1, 1, 3, 4, 5],
      maxRentDurations: [10, 2, 2, 10, 30, 20],
      dailyRentPrices: [
        toPrice(1.11),
        toPrice(2.22),
        toPrice(3.33),
        toPrice(4.44),
        toPrice(5.55),
        toPrice(6.66),
      ],
      collaterals: [
        toPrice(11.11),
        toPrice(22.22),
        toPrice(33.33),
        toPrice(44.44),
        toPrice(55.55),
        toPrice(66.66),
      ],
      paymentTokens: [
        PaymentToken.WETH,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.USDT,
        PaymentToken.TUSD,
        PaymentToken.RENT,
      ],
      rentDurations: [1, 2, 3, 4, 5, 6],
    });

    expect(prepd).to.deep.equal({
      nfts: {
        nft: ['A', 'A', 'A', 'B', 'C', 'D'],
        tokenIds: [
          BigNumber.from('2'),
          BigNumber.from('10'),
          BigNumber.from('3'),
          BigNumber.from('1'),
          BigNumber.from('2'),
          BigNumber.from('22'),
        ],
      },
      lendAmounts: [2, 3, 5, 1, 1, 4],
      maxRentDurations: [10, 10, 20, 2, 2, 30],
      dailyRentPrices: [
        toPrice(1.11),
        toPrice(4.44),
        toPrice(6.66),
        toPrice(2.22),
        toPrice(3.33),
        toPrice(5.55),
      ],
      collaterals: [
        toPrice(11.11),
        toPrice(44.44),
        toPrice(66.66),
        toPrice(22.22),
        toPrice(33.33),
        toPrice(55.55),
      ],
      paymentTokens: [
        PaymentToken.WETH,
        PaymentToken.USDT,
        PaymentToken.RENT,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD,
      ],
      rentDurations: [1, 4, 6, 2, 3, 5],
    });
  });

  it('batch - domain #3', () => {
    const prepd = prepareBatch({
      nfts: {
        nft: ['A', 'B', 'C', 'A', 'D', 'A', 'E', 'F', 'E'],
        tokenIds: [
          BigNumber.from('10'),
          BigNumber.from('1'),
          BigNumber.from('2'),
          BigNumber.from('2'),
          BigNumber.from('22'),
          BigNumber.from('3'),
          BigNumber.from('20'),
          BigNumber.from('10'),
          BigNumber.from('11'),
        ],
      },
      lendAmounts: [2, 1, 1, 3, 4, 5, 10, 11, 20],
      maxRentDurations: [10, 2, 2, 10, 30, 20, 10, 11, 20],
      dailyRentPrices: [
        toPrice(1.11),
        toPrice(2.22),
        toPrice(3.33),
        toPrice(4.44),
        toPrice(5.55),
        toPrice(6.66),
        toPrice(7.77),
        toPrice(8.88),
        toPrice(9.99),
      ],
      collaterals: [
        toPrice(11.11),
        toPrice(22.22),
        toPrice(33.33),
        toPrice(44.44),
        toPrice(55.55),
        toPrice(66.66),
        toPrice(77.77),
        toPrice(88.88),
        toPrice(99.99),
      ],
      paymentTokens: [
        PaymentToken.WETH,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.USDT,
        PaymentToken.TUSD,
        PaymentToken.RENT,
        PaymentToken.WETH,
        PaymentToken.WETH,
        PaymentToken.WETH,
      ],
      rentDurations: [1, 2, 3, 4, 5, 6, 6, 6, 6],
    });

    expect(prepd).to.deep.equal({
      nfts: {
        nft: ['A', 'A', 'A', 'B', 'C', 'D', 'E', 'E', 'F'],
        tokenIds: [
          BigNumber.from('10'),
          BigNumber.from('2'),
          BigNumber.from('3'),
          BigNumber.from('1'),
          BigNumber.from('2'),
          BigNumber.from('22'),
          BigNumber.from('20'),
          BigNumber.from('11'),
          BigNumber.from('10'),
        ],
      },
      lendAmounts: [2, 3, 5, 1, 1, 4, 10, 20, 11],
      maxRentDurations: [10, 10, 20, 2, 2, 30, 10, 20, 11],
      dailyRentPrices: [
        toPrice(1.11),
        toPrice(4.44),
        toPrice(6.66),
        toPrice(2.22),
        toPrice(3.33),
        toPrice(5.55),
        toPrice(7.77),
        toPrice(9.99),
        toPrice(8.88),
      ],
      collaterals: [
        toPrice(11.11),
        toPrice(44.44),
        toPrice(66.66),
        toPrice(22.22),
        toPrice(33.33),
        toPrice(55.55),
        toPrice(77.77),
        toPrice(99.99),
        toPrice(88.88),
      ],
      paymentTokens: [
        PaymentToken.WETH,
        PaymentToken.USDT,
        PaymentToken.RENT,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD,
        PaymentToken.WETH,
        PaymentToken.WETH,
        PaymentToken.WETH,
      ],
      rentDurations: [1, 4, 6, 2, 3, 5, 6, 6, 6],
    });
  });
});
