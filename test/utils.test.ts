import { expect } from "chai";
import { BigNumber } from "ethers";
import { PaymentToken } from "../src/types";

import { packPrice, toPaddedHex, bytesToNibbles, prepareBatch } from "../src/utils";

describe("Utils", () => {
  it("packs usual domain", () => {
    const price = 21.42;
    const packed = packPrice(price);
    expect(packed).to.be.equal("0x0015002A");
  });

  it("pads usual domain", () => {
    const price = 21;
    const padded = toPaddedHex(price, 32);
    expect(padded).to.be.equal("0x00000015");
  });

  it("truncates the excess decimals", () => {
    const price = 21.99999;
    const packed = packPrice(price);
    expect(packed).to.be.equal("0x0015270F");
  });

  it("works with zero decimal", () => {
    const price = 21.0;
    const packed = packPrice(price);
    expect(packed).to.be.equal("0x00150000");
  });

  it("works with zero", () => {
    const price = 0;
    const packed = packPrice(price);
    expect(packed).to.be.equal("0x00000000");
  });

  it("throws on unsigned", () => {
    const price = -1;
    expect(() => packPrice(price)).to.throw();
  });

  it("throws if exceeds 9999.9999", () => {
    const price = 10000;
    expect(() => packPrice(price)).to.throw();
  });

  it("throws on invalid price", () => {
    const price = "11.22.33";
    expect(() => packPrice(price)).to.throw();
  });

  it("throws if bitsize exceeds 32", () => {
    const bitsize = 33;
    expect(() => toPaddedHex(1, bitsize)).to.throw();
  });

  it("throws if !number supplied", () => {
    const byteCount = "2";
    //@ts-ignore
    expect(() => bytesToNibbles(byteCount)).to.throw();
  });

  it("throws if zero byteCount", () => {
    const byteCount = 0;
    expect(() => bytesToNibbles(byteCount)).to.throw();
  });

  it("batches usual domain", () => {
    const prepd = prepareBatch({
      nftAddress: ["A", "B", "C", "A"],
      tokenID: [
        BigNumber.from("10"),
        BigNumber.from("1"),
        BigNumber.from("2"),
        BigNumber.from("2")
      ],
      is721: [
        false,
        true,
        true,
        false
      ]
    });
    expect(prepd).to.deep.equal({
      nftAddress: ["A", "A", "B", "C"],
      tokenID: [
        BigNumber.from("2"),
        BigNumber.from("10"),
        BigNumber.from("1"),
        BigNumber.from("2")
      ],
      is721: [
        false,
        false,
        true,
        true
      ]
    })
  });

  it("batches usual domain.", () => {
    const prepd = prepareBatch({
      nftAddress: ["A", "B", "C", "A", "D", "A"],
      tokenID: [
        BigNumber.from("2"),
        BigNumber.from("1"),
        BigNumber.from("2"),
        BigNumber.from("10"),
        BigNumber.from("22"),
        BigNumber.from("3")
      ],
      is721: [
        false,
        true,
        true,
        false,
        false,
        false
      ],
      amount: [
        2,
        1,
        1,
        3,
        4,
        5
      ],
      maxRentDuration: [
        10,
        2,
        2,
        10,
        30,
        20
      ],
      dailyRentPrice: [
        packPrice(1.11),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(4.44),
        packPrice(5.55),
        packPrice(6.66)
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(44.44),
        packPrice(55.55),
        packPrice(66.66)
      ],
      paymentToken: [
        PaymentToken.WETH,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.USDT,
        PaymentToken.TUSD,
        PaymentToken.RENT
      ],
      rentDuration: [
        1,
        2,
        3,
        4,
        5,
        6
      ]
    });

    // nftAddress: ["A", "B", "C", "A", "D", "A"],
    // nftAddress: ["A", "A", "B", "C", "A", "D"],
    // nftAddress: ["A", "A", "A", "B", "C", "D"],
    expect(prepd).to.deep.equal({
      nftAddress: ["A", "A", "A", "B", "C", "D"],
      tokenID: [
        BigNumber.from("2"),
        BigNumber.from("3"),
        BigNumber.from("10"),
        BigNumber.from("1"),
        BigNumber.from("2"),
        BigNumber.from("22")
      ],
      is721: [
        false,
        false,
        false,
        true,
        true,
        false
      ],
      amount: [
        2,
        5,
        3,
        1,
        1,
        4
      ],
      maxRentDuration: [
        10,
        20,
        10,
        2,
        2,
        30
      ],
      dailyRentPrice: [
        packPrice(1.11),
        packPrice(6.66),
        packPrice(4.44),
        packPrice(2.22),
        packPrice(3.33),
        packPrice(5.55)
      ],
      nftPrice: [
        packPrice(11.11),
        packPrice(66.66),
        packPrice(44.44),
        packPrice(22.22),
        packPrice(33.33),
        packPrice(55.55)
      ],
      paymentToken: [
        PaymentToken.WETH,
        PaymentToken.RENT,
        PaymentToken.USDT,
        PaymentToken.DAI,
        PaymentToken.USDC,
        PaymentToken.TUSD
      ],
      rentDuration: [
        1,
        6,
        4,
        2,
        3,
        5
      ]
    })
  });
});
