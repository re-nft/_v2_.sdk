import { expect } from 'chai';
import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import { PaymentToken, RenftContracts } from '../src/types';

import { toScaledAmount, fromScaledAmount } from '../src/utils';

describe('Scaling', () => {

  it('Scales one WETH for Whopi Fuji (string input)', () => {
    const unscaledOneWETH = '1';
    const scaledOneWTH = toScaledAmount(
      unscaledOneWETH,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.WETH
    );
    expect(scaledOneWTH.toString()).to.equal(
      parseFixed(unscaledOneWETH, 18).toString()
    );
  });

  it('Scales one USDC for Whoopi Fuji (string input)', () => {
    const unscaledOneUSDC = '1';
    const scaledOneUSDC = toScaledAmount(
      unscaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('1000000').toString()
    );
  });

  it('Scales one USDC for Whoopi Fuji (number input)', () => {
    const unscaledOneUSDC = 1;
    const scaledOneUSDC = toScaledAmount(
      unscaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('1000000').toString()
    );
  });

  it('Scales 0.1 USDC for Whoopi Fuji (string input)', () => {
    const unscaledOneUSDC = '0.1';
    const scaledOneUSDC = toScaledAmount(
      unscaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('100000').toString()
    );
  });

  it('Scales 0.1 USDC for Whoopi Fuji (number input)', () => {
    const unscaledOneUSDC = 0.1;
    const scaledOneUSDC = toScaledAmount(
      unscaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(scaledOneUSDC.toString()).to.equal(
      BigNumber.from('100000').toString()
    );
  });

  it('Unscales 1 USDC for Whoopi Fuji (number input)', () => {
    const scaledOneUSDC = 1000000;
    const unscaledOneUSDC = fromScaledAmount(
      scaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('1');
  });

  it('Unscales 1 USDC for Whoopi Fuji (string input)', () => {
    const scaledOneUSDC = '1000000';
    const unscaledOneUSDC = fromScaledAmount(
      scaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('1');
  });

  it('Unscales 0.1 USDC for Whoopi Fuji (number input)', () => {
    const scaledOneUSDC = 100000;
    const unscaledOneUSDC = fromScaledAmount(
      scaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('0.1');
  });

  it('Unscales 0.1 USDC for Whoopi Fuji (string input)', () => {
    const scaledOneUSDC = '100000';
    const unscaledOneUSDC = fromScaledAmount(
      scaledOneUSDC,
      RenftContracts.WHOOPI_FUJI,
      PaymentToken.USDC
    );
    expect(unscaledOneUSDC).to.equal('0.1');
  });
});
