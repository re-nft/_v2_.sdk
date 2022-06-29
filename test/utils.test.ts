import { expect } from 'chai';
import { BigNumber } from '@ethersproject/bignumber';
import { PaymentToken, RenftContracts } from '../src/types';

import {
  toScaledAmount,
  //   fromScaledAmount
} from '../src/utils';

describe('Scaling', () => {
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

  it('Scales point one USDC for Whoopi Fuji (string input)', () => {
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

  it('Scales point one USDC for Whoopi Fuji (number input)', () => {
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
});
