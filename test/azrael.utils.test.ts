import { expect } from 'chai';
import { BigNumber } from '@ethersproject/bignumber';
import { PaymentToken } from '../src/types';

import {
  packPrice,
  toPaddedHex,
  bytesToNibbles,
  prepareBatch,
  unpackPrice,
} from '../src/utils';

// Azrael - v1 collateral

describe('Utils', () => {
  it('packs usual domain', () => {
    const price = 21.42;
    const packed = packPrice(price);
    expect(packed).to.be.equal('0x00151068');
  });

  it('packs 1.1', () => {
    const price = 1.1;
    const packed = packPrice(price);
    expect(packed).to.be.equal('0x000103E8');
  });

  it('pads usual domain', () => {
    const price = 21;
    const padded = toPaddedHex(price, 32);
    expect(padded).to.be.equal('0x00000015');
  });

  it('truncates the excess decimals', () => {
    const price = 21.99999;
    const packed = packPrice(price);
    expect(packed).to.be.equal('0x0015270F');
  });

  it('works with zero decimal', () => {
    const price = 21.0;
    const packed = packPrice(price);
    expect(packed).to.be.equal('0x00150000');
  });

  it('works with zero', () => {
    const price = 0;
    const packed = packPrice(price);
    expect(packed).to.be.equal('0x00000000');
  });

  it('throws on unsigned', () => {
    const price = -1;
    expect(() => packPrice(price)).to.throw();
  });

  it('throws if exceeds 9999.9999', () => {
    const price = 10000;
    expect(() => packPrice(price)).to.throw();
  });

  it('throws on invalid price', () => {
    const price = '11.22.33';
    expect(() => packPrice(price)).to.throw();
  });

  it('unpacks to correct number - 1.1', () => {
    const price = '1.1';
    const packedPrice = packPrice(price);
    const unpackedPrice = unpackPrice(packedPrice);
    expect(unpackedPrice.toString()).to.be.equal(price);
  });

  it('unpacks to correct number - 1.0101', () => {
    const price = '1.0101';
    const packedPrice = packPrice(price);
    const unpackedPrice = unpackPrice(packedPrice);
    expect(unpackedPrice.toString()).to.be.equal(price);
  });

  it('unpacks to correct number - 1.101', () => {
    const price = '1.101';
    const packedPrice = packPrice(price);
    const unpackedPrice = unpackPrice(packedPrice);
    expect(unpackedPrice.toString()).to.be.equal(price);
  });

  it('unpacks to correct number - 1.0001', () => {
    const price = '1.0001';
    const packedPrice = packPrice(price);
    expect(packedPrice).to.be.equal('0x00010001');
    const unpackedPrice = unpackPrice(packedPrice);
    expect(unpackedPrice.toString()).to.be.equal(price);
  });

  it('unpacks to correct number - 2874.3580', () => {
    const price = '2874.3580';
    const packedPrice = packPrice(price);
    const unpackedPrice = unpackPrice(packedPrice);
    expect(unpackedPrice.toString()).to.be.equal('2874.358');
  });

  it('throws if bitsize exceeds 32', () => {
    const bitsize = 33;
    expect(() => toPaddedHex(1, bitsize)).to.throw();
  });

  it('throws if !number supplied', () => {
    const byteCount = '2';
    //@ts-ignore
    expect(() => bytesToNibbles(byteCount)).to.throw();
  });

  it('throws if zero byteCount', () => {
    const byteCount = 0;
    expect(() => bytesToNibbles(byteCount)).to.throw();
  });

  it('batch - single item return', () => {
    const lendThis = {
      nftAddress: ['A'],
      tokenID: [BigNumber.from('1')],
    };
    const prepd = prepareBatch(lendThis);
    expect(prepd).to.deep.equal(lendThis);
  });

  it('batch - domain #1', () => {
    const prepd = prepareBatch({
      nftAddress: ['A', 'B', 'C', 'A'],
      tokenID: [
        BigNumber.from('10'),
        BigNumber.from('1'),
        BigNumber.from('2'),
        BigNumber.from('2'),
      ],
    });

    expect(prepd).to.deep.equal({
      nftAddress: ['A', 'A', 'B', 'C'],
      tokenID: [
        BigNumber.from('2'),
        BigNumber.from('10'),
        BigNumber.from('1'),
        BigNumber.from('2'),
      ],
    });
  });

  it('batch - domain #2', () => {
    const prepd = prepareBatch({
      nftAddress: ['A', 'B', 'C', 'A', 'D', 'A'],
      tokenID: [
        BigNumber.from('2'), // 0
        BigNumber.from('1'), // 3
        BigNumber.from('2'), // 4
        BigNumber.from('10'), // 2
        BigNumber.from('22'), // 5
        BigNumber.from('3'), // 1
      ],
      amount: [
        2, // 0
        1, // 3
        1, // 4
        3, // 2
        4, // 5
        5, // 1
      ],
      maxRentDuration: [10, 2, 2, 10, 30, 20],
      dailyRentPrice: [
        packPrice(1.11),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(4.44),
        packPrice(5.55),
        packPrice(6.66),
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(44.44),
        packPrice(55.55),
        packPrice(66.66),
      ],
      paymentToken: [
        PaymentToken.WETH,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.USDT,
        PaymentToken.TUSD,
        PaymentToken.RENT,
      ],
      rentDuration: [1, 2, 3, 4, 5, 6],
    });

    expect(prepd).to.deep.equal({
      nftAddress: ['A', 'A', 'A', 'B', 'C', 'D'],
      tokenID: [
        BigNumber.from('2'),
        BigNumber.from('3'),
        BigNumber.from('10'),
        BigNumber.from('1'),
        BigNumber.from('2'),
        BigNumber.from('22'),
      ],
      amount: [2, 5, 3, 1, 1, 4],
      maxRentDuration: [10, 20, 10, 2, 2, 30],
      dailyRentPrice: [
        packPrice(1.11),
        packPrice(6.66),
        packPrice(4.44),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(5.55),
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(66.66),
        packPrice(44.44),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(55.55),
      ],
      paymentToken: [
        PaymentToken.WETH,
        PaymentToken.RENT,
        PaymentToken.USDT,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD,
      ],
      rentDuration: [1, 6, 4, 2, 3, 5],
    });
  });

  it('batch - domain #3', () => {
    const prepd = prepareBatch({
      nftAddress: ['A', 'B', 'C', 'A', 'D', 'A', 'E', 'F', 'E'],
      tokenID: [
        // A:2
        BigNumber.from('10'),
        // B:3
        BigNumber.from('1'),
        // C:4
        BigNumber.from('2'),
        // A:0
        BigNumber.from('2'),
        // D:5
        BigNumber.from('22'),
        // A:1
        BigNumber.from('3'),
        // E:7
        BigNumber.from('20'),
        // F:8
        BigNumber.from('10'),
        // E:6
        BigNumber.from('11'),
      ],
      amount: [
        2, // 2
        1, // 3
        1, // 4
        3, // 0
        4, // 5
        5, // 1
        10, // 7
        11, // 8
        20, // 6
      ],
      maxRentDuration: [
        10, // 2
        2, // 3
        2, // 4
        10, // 0
        30, // 5
        20, // 1
        10, // 7
        11, // 8
        20, // 6
      ],
      dailyRentPrice: [
        packPrice(1.11), // 2
        packPrice(2.22), // 3
        packPrice(3.33), // 4
        packPrice(4.44), // 0
        packPrice(5.55), // 5
        packPrice(6.66), // 1
        packPrice(7.77), // 7
        packPrice(8.88), // 8
        packPrice(9.99), // 6
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(44.44),
        packPrice(55.55),
        packPrice(66.66),
        packPrice(77.77),
        packPrice(88.88),
        packPrice(99.99),
      ],
      paymentToken: [
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
      rentDuration: [1, 2, 3, 4, 5, 6, 6, 6, 6],
    });

    expect(prepd).to.deep.equal({
      nftAddress: ['A', 'A', 'A', 'B', 'C', 'D', 'E', 'E', 'F'],
      tokenID: [
        BigNumber.from('2'),
        BigNumber.from('3'),
        BigNumber.from('10'),
        BigNumber.from('1'),
        BigNumber.from('2'),
        BigNumber.from('22'),
        BigNumber.from('11'),
        BigNumber.from('20'),
        BigNumber.from('10'),
      ],
      amount: [3, 5, 2, 1, 1, 4, 20, 10, 11],
      maxRentDuration: [10, 20, 10, 2, 2, 30, 20, 10, 11],
      dailyRentPrice: [
        packPrice(4.44),
        packPrice(6.66),
        packPrice(1.11),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(5.55),
        packPrice(9.99),
        packPrice(7.77),
        packPrice(8.88),
      ],
      nftPrice: [
        packPrice(44.44),
        packPrice(66.66),
        packPrice(11.11),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(55.55),
        packPrice(99.99),
        packPrice(77.77),
        packPrice(88.88),
      ],
      paymentToken: [
        PaymentToken.USDT,
        PaymentToken.RENT,
        PaymentToken.WETH,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD,
        PaymentToken.WETH,
        PaymentToken.WETH,
        PaymentToken.WETH,
      ],
      rentDuration: [4, 6, 1, 2, 3, 5, 6, 6, 6],
    });
  });
});
