import {BigNumber, parseFixed} from '@ethersproject/bignumber';
import {expect} from 'chai';

import {
  EVMNetworkType,
  fromWhoopiScaledAmount,
  PaymentToken,
  toWhoopiScaledAmount,
} from '../src';

describe('Scaling', () => {
  it('Scales one WETH for Whopi Fuji (string input)', () => {
    const unscaledOneWETH = '1.0';
    const scaledOneWTH = toWhoopiScaledAmount(
      unscaledOneWETH,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.WETH
    );
    expect(scaledOneWTH.toString()).to.equal(
      parseFixed(unscaledOneWETH, 18).toString()
    );
  });

  it('Scales one USDC for Whoopi Fuji (string input)', () => {
    const unscaledOneUSDC = '1';
    const scaledOneUSDC = toWhoopiScaledAmount(
      unscaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('1000000').toString()
    );
  });

  it('Scales one USDC for Whoopi Fuji (number input)', () => {
    const unscaledOneUSDC = 1;
    const scaledOneUSDC = toWhoopiScaledAmount(
      unscaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('1000000').toString()
    );
  });

  it('Scales 0.1 USDC for Whoopi Fuji (string input)', () => {
    const unscaledOneUSDC = '0.1';
    const scaledOneUSDC = toWhoopiScaledAmount(
      unscaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('100000').toString()
    );
  });

  it('Scales 0.1 USDC for Whoopi Fuji (number input)', () => {
    const unscaledOneUSDC = 0.1;
    const scaledOneUSDC = toWhoopiScaledAmount(
      unscaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('100000').toString()
    );
  });

  it('Unscales 1 USDC for Whoopi Fuji (number input)', () => {
    const scaledOneUSDC = 1000000;
    const unscaledOneUSDC = fromWhoopiScaledAmount(
      scaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('1.0');
  });

  it('Unscales 1 USDC for Whoopi Fuji (string input)', () => {
    const scaledOneUSDC = '1000000';
    const unscaledOneUSDC = fromWhoopiScaledAmount(
      scaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('1.0');
  });

  it('Unscales 0.1 USDC for Whoopi Fuji (number input)', () => {
    const scaledOneUSDC = 100000;
    const unscaledOneUSDC = fromWhoopiScaledAmount(
      scaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('0.1');
  });

  it('Unscales 0.1 USDC for Whoopi Fuji (string input)', () => {
    const scaledOneUSDC = '100000';
    const unscaledOneUSDC = fromWhoopiScaledAmount(
      scaledOneUSDC,
      EVMNetworkType.AVALANCHE_FUJI_TESTNET,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('0.1');
  });
});
