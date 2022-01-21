import { expect } from 'chai';
import { BigNumber } from 'ethers';
// import { PaymentToken } from '../src/types';

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

  it('produces Price { whole: 10, decimal: 11 } from string', () => {
    const price = toPrice('10.11');
    expect(price).to.deep.equal({ whole: 10, decimal: 11 });
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

  // todo: 1 should map  to 0.01
  // todo: 10 should map to 0.10

  it('produces 0.01 from Price { whole: 0, decimal: "01"}', () => {
    const price = { whole: 0, decimal: '01' };
    const number = toNumber(price);
    expect(number).to.be.equal(0.01);
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

  // it('batch - domain #2', () => {
  //   const prepd = prepareBatch({
  //     nftAddress: ['A', 'B', 'C', 'A', 'D', 'A'],
  //     tokenID: [
  //       BigNumber.from('2'), // 0
  //       BigNumber.from('1'), // 3
  //       BigNumber.from('2'), // 4
  //       BigNumber.from('10'), // 2
  //       BigNumber.from('22'), // 5
  //       BigNumber.from('3'), // 1
  //     ],
  //     amount: [
  //       2, // 0
  //       1, // 3
  //       1, // 4
  //       3, // 2
  //       4, // 5
  //       5, // 1
  //     ],
  //     maxRentDuration: [10, 2, 2, 10, 30, 20],
  //     dailyRentPrice: [
  //       packPrice(1.11),
  //       packPrice(2.22),
  //       packPrice(3.33),
  //       packPrice(4.44),
  //       packPrice(5.55),
  //       packPrice(6.66),
  //     ],
  //     nftPrice: [
  //       packPrice(11.11),
  //       packPrice(22.22),
  //       packPrice(33.33),
  //       packPrice(44.44),
  //       packPrice(55.55),
  //       packPrice(66.66),
  //     ],
  //     paymentToken: [
  //       PaymentToken.WETH,
  //       PaymentToken.DAI,
  //       PaymentToken.USDC,
  //       PaymentToken.USDT,
  //       PaymentToken.TUSD,
  //       PaymentToken.RENT,
  //     ],
  //     rentDuration: [1, 2, 3, 4, 5, 6],
  //   });

  //   expect(prepd).to.deep.equal({
  //     nftAddress: ['A', 'A', 'A', 'B', 'C', 'D'],
  //     tokenID: [
  //       BigNumber.from('2'),
  //       BigNumber.from('3'),
  //       BigNumber.from('10'),
  //       BigNumber.from('1'),
  //       BigNumber.from('2'),
  //       BigNumber.from('22'),
  //     ],
  //     amount: [2, 5, 3, 1, 1, 4],
  //     maxRentDuration: [10, 20, 10, 2, 2, 30],
  //     dailyRentPrice: [
  //       packPrice(1.11),
  //       packPrice(6.66),
  //       packPrice(4.44),
  //       packPrice(2.22),
  //       packPrice(3.33),
  //       packPrice(5.55),
  //     ],
  //     nftPrice: [
  //       packPrice(11.11),
  //       packPrice(66.66),
  //       packPrice(44.44),
  //       packPrice(22.22),
  //       packPrice(33.33),
  //       packPrice(55.55),
  //     ],
  //     paymentToken: [
  //       PaymentToken.WETH,
  //       PaymentToken.RENT,
  //       PaymentToken.USDT,
  //       PaymentToken.DAI,
  //       PaymentToken.USDC,
  //       PaymentToken.TUSD,
  //     ],
  //     rentDuration: [1, 6, 4, 2, 3, 5],
  //   });
  // });

  // it('batch - domain #3', () => {
  //   const prepd = prepareBatch({
  //     nftAddress: ['A', 'B', 'C', 'A', 'D', 'A', 'E', 'F', 'E'],
  //     tokenID: [
  //       // A:2
  //       BigNumber.from('10'),
  //       // B:3
  //       BigNumber.from('1'),
  //       // C:4
  //       BigNumber.from('2'),
  //       // A:0
  //       BigNumber.from('2'),
  //       // D:5
  //       BigNumber.from('22'),
  //       // A:1
  //       BigNumber.from('3'),
  //       // E:7
  //       BigNumber.from('20'),
  //       // F:8
  //       BigNumber.from('10'),
  //       // E:6
  //       BigNumber.from('11'),
  //     ],
  //     amount: [
  //       2, // 2
  //       1, // 3
  //       1, // 4
  //       3, // 0
  //       4, // 5
  //       5, // 1
  //       10, // 7
  //       11, // 8
  //       20, // 6
  //     ],
  //     maxRentDuration: [
  //       10, // 2
  //       2, // 3
  //       2, // 4
  //       10, // 0
  //       30, // 5
  //       20, // 1
  //       10, // 7
  //       11, // 8
  //       20, // 6
  //     ],
  //     dailyRentPrice: [
  //       packPrice(1.11), // 2
  //       packPrice(2.22), // 3
  //       packPrice(3.33), // 4
  //       packPrice(4.44), // 0
  //       packPrice(5.55), // 5
  //       packPrice(6.66), // 1
  //       packPrice(7.77), // 7
  //       packPrice(8.88), // 8
  //       packPrice(9.99), // 6
  //     ],
  //     nftPrice: [
  //       packPrice(11.11),
  //       packPrice(22.22),
  //       packPrice(33.33),
  //       packPrice(44.44),
  //       packPrice(55.55),
  //       packPrice(66.66),
  //       packPrice(77.77),
  //       packPrice(88.88),
  //       packPrice(99.99),
  //     ],
  //     paymentToken: [
  //       PaymentToken.WETH,
  //       PaymentToken.DAI,
  //       PaymentToken.USDC,
  //       PaymentToken.USDT,
  //       PaymentToken.TUSD,
  //       PaymentToken.RENT,
  //       PaymentToken.WETH,
  //       PaymentToken.WETH,
  //       PaymentToken.WETH,
  //     ],
  //     rentDuration: [1, 2, 3, 4, 5, 6, 6, 6, 6],
  //   });

  //   expect(prepd).to.deep.equal({
  //     nftAddress: ['A', 'A', 'A', 'B', 'C', 'D', 'E', 'E', 'F'],
  //     tokenID: [
  //       BigNumber.from('2'),
  //       BigNumber.from('3'),
  //       BigNumber.from('10'),
  //       BigNumber.from('1'),
  //       BigNumber.from('2'),
  //       BigNumber.from('22'),
  //       BigNumber.from('11'),
  //       BigNumber.from('20'),
  //       BigNumber.from('10'),
  //     ],
  //     amount: [3, 5, 2, 1, 1, 4, 20, 10, 11],
  //     maxRentDuration: [10, 20, 10, 2, 2, 30, 20, 10, 11],
  //     dailyRentPrice: [
  //       packPrice(4.44),
  //       packPrice(6.66),
  //       packPrice(1.11),
  //       packPrice(2.22),
  //       packPrice(3.33),
  //       packPrice(5.55),
  //       packPrice(9.99),
  //       packPrice(7.77),
  //       packPrice(8.88),
  //     ],
  //     nftPrice: [
  //       packPrice(44.44),
  //       packPrice(66.66),
  //       packPrice(11.11),
  //       packPrice(22.22),
  //       packPrice(33.33),
  //       packPrice(55.55),
  //       packPrice(99.99),
  //       packPrice(77.77),
  //       packPrice(88.88),
  //     ],
  //     paymentToken: [
  //       PaymentToken.USDT,
  //       PaymentToken.RENT,
  //       PaymentToken.WETH,
  //       PaymentToken.DAI,
  //       PaymentToken.USDC,
  //       PaymentToken.TUSD,
  //       PaymentToken.WETH,
  //       PaymentToken.WETH,
  //       PaymentToken.WETH,
  //     ],
  //     rentDuration: [4, 6, 1, 2, 3, 5, 6, 6, 6],
  //   });
  // });
});
