import { expect } from 'chai';
import isEqual from 'react-fast-compare';

import {
  AZRAEL_ABI,
  RESOLVER_ABI,
  SYLVESTER_ABI,
  WHOOPI_ABI,
} from '../src';

import azrael_v0 from '../src/abi/azrael.v0.abi.json';
import resolver_v0 from '../src/abi/resolver.v0.abi.json';
import sylvester_v0 from '../src/abi/sylvester.v0.abi.json';
import whoopi_v0 from '../src/abi/whoopi.v0.abi.json';

describe('module exports', () => {
  it('abis', () => {
    // Ensure dynamic abi lookup doesn't invalidate existing dependents.
    expect(isEqual(AZRAEL_ABI.abi, azrael_v0)).to.be.true;
    expect(isEqual(RESOLVER_ABI.abi, resolver_v0)).to.be.true;
    expect(isEqual(SYLVESTER_ABI.abi, sylvester_v0)).to.be.true;
    expect(isEqual(WHOOPI_ABI.abi, whoopi_v0)).to.be.true;
  });
});