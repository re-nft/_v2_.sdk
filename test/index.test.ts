import { expect } from 'chai';
import isEqual from 'react-fast-compare';

import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  getDeploymentAbi,
} from '../src';

import azrael_v0 from '../src/abi/azrael.v0.abi.json';
import resolver_v0 from '../src/abi/resolver.v0.abi.json';
import sylvester_v0 from '../src/abi/sylvester.v0.abi.json';
import whoopi_v0 from '../src/abi/whoopi.v0.abi.json';

describe('module exports', () => {
  it('abis', () => {
    // Ensure dynamic abi lookup doesn't invalidate existing dependents.
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0), azrael_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0), sylvester_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0), sylvester_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0), whoopi_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0), whoopi_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0), resolver_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0), resolver_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0), resolver_v0)).to.be.true;
    expect(isEqual(getDeploymentAbi(DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0), resolver_v0)).to.be.true;
  });
});
