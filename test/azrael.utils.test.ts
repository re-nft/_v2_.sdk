import { expect } from 'chai';

import {
  PaymentToken,
  packPrice,
  toPaddedHex,
  bytesToNibbles,
  prepareBatch,
  unpackPrice,
} from '../src';

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

  it('throws if price has decimal length > 4', () => {
    const price = 0.000001;
    expect(() => packPrice(price)).to.throw();
  });


  it('pads usual domain', () => {
    const price = 21;
    const padded = toPaddedHex(price, 32);
    expect(padded).to.be.equal('0x00000015');
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
      tokenID: ['1'],
    };
    const prepd = prepareBatch(lendThis);
    expect(prepd).to.deep.equal(lendThis);
  });

  it('batch - domain #1', () => {
    const prepd = prepareBatch({
      nftAddress: ['A', 'B', 'C', 'A'],
      tokenID: ['10', '1', '2', '2'],
    });

    expect(prepd).to.deep.equal({
      nftAddress: ['A', 'A', 'B', 'C'],
      tokenID: ['10', '2', '1', '2'],
    });
  });

  it('batch - domain #2', () => {
    const prepd = prepareBatch({
      nftAddress: ['A', 'B', 'C', 'A', 'D', 'A'],
      tokenID: [
        '2', // 0
        '1', // 3
        '2', // 4
        '10', // 1
        '22', // 5
        '3', // 2
      ],
      amount: [
        2, // 0
        1, // 3
        1, // 4
        3, // 1
        4, // 5
        5, // 2
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
        PaymentToken.ACS,
      ],
      rentDuration: [1, 2, 3, 4, 5, 6],
    });

    expect(prepd).to.deep.equal({
      nftAddress: ['A', 'A', 'A', 'B', 'C', 'D'],
      tokenID: ['2', '10', '3', '1', '2', '22'],
      amount: [2, 3, 5, 1, 1, 4],
      maxRentDuration: [10, 10, 20, 2, 2, 30],
      dailyRentPrice: [
        packPrice(1.11),
        packPrice(4.44),
        packPrice(6.66),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(5.55),
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(44.44),
        packPrice(66.66),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(55.55),
      ],
      paymentToken: [
        PaymentToken.WETH,
        PaymentToken.USDT,
        PaymentToken.ACS,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD,
      ],
      rentDuration: [1, 4, 6, 2, 3, 5],
    });
  });

  it('batch - domain #3', () => {
    const prepd = prepareBatch({
      nftAddress: [
        'A', // 0
        'B', // 3
        'C', // 4
        'A', // 1
        'D', // 5
        'A', // 2
        'E', // 6
        'F', // 8
        'E', // 7
      ],
      tokenID: [
        '10', // 0 -> 10
        '1', // 3 -> 2
        '2', // 4 -> 3
        '2', // 1 -> 1
        '22', // 5 -> 2
        '3', // 2 -> 22
        '20', // 6 -> 20
        '10', // 8 -> 11
        '11', // 7 -> 10
      ],
      // becomes -> [2, 3, 5, 1, 1, 4, 10, 20, 11]
      amount: [
        2, // 0
        1, // 3
        1, // 4
        3, // 1
        4, // 5
        5, // 2
        10, // 6
        11, // 8
        20, // 7
      ],
      // becomes -> [10, 10, 20, 2, 2, 30, 10, 20, 11]
      maxRentDuration: [
        10, // 0
        2, // 3
        2, // 4
        10, // 1
        30, // 5
        20, // 2
        10, // 6
        11, // 8
        20, // 7
      ],
      dailyRentPrice: [
        packPrice(1.11), // 0
        packPrice(2.22), // 3
        packPrice(3.33), // 4
        packPrice(4.44), // 1
        packPrice(5.55), // 5
        packPrice(6.66), // 2
        packPrice(7.77), // 6
        packPrice(8.88), // 8
        packPrice(9.99), // 7
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
        PaymentToken.ACS,
        PaymentToken.WETH,
        PaymentToken.WETH,
        PaymentToken.WETH,
      ],
      rentDuration: [1, 2, 3, 4, 5, 6, 6, 6, 6],
    });

    expect(prepd).to.deep.equal({
      nftAddress: ['A', 'A', 'A', 'B', 'C', 'D', 'E', 'E', 'F'],
      tokenID: ['10', '2', '3', '1', '2', '22', '20', '11', '10'],
      amount: [2, 3, 5, 1, 1, 4, 10, 20, 11],
      maxRentDuration: [10, 10, 20, 2, 2, 30, 10, 20, 11],
      dailyRentPrice: [
        packPrice(1.11),
        packPrice(4.44),
        packPrice(6.66),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(5.55),
        packPrice(7.77),
        packPrice(9.99),
        packPrice(8.88),
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(44.44),
        packPrice(66.66),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(55.55),
        packPrice(77.77),
        packPrice(99.99),
        packPrice(88.88),
      ],
      paymentToken: [
        PaymentToken.WETH,
        PaymentToken.USDT,
        PaymentToken.ACS,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD,
        PaymentToken.WETH,
        PaymentToken.WETH,
        PaymentToken.WETH,
      ],
      rentDuration: [1, 4, 6, 2, 3, 5, 6, 6, 6],
    });
  });
});
