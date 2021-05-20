import { expect } from "chai";

import { packPrice, toPaddedHex, bytesToNibbles } from "../src/utils";

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
});
