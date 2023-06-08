import { Signer } from '@ethersproject/abstract-signer';
import { expect } from 'chai';
import isEqual from 'react-fast-compare';

import AzraelV0Abi from '../../src/abi/azrael.v0';
import ResolverV0Abi from '../../src/abi/resolver.v0';
import SylvesterV0Abi from '../../src/abi/sylvester.v0';
import WhoopiV0Abi from '../../src/abi/whoopi.v0';
import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0,
  DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
} from '../../src/core';
import {
  AzraelV0FunctionInterface,
  getDeploymentAbi,
  getRenftContract,
} from '../../src/ethers';

describe('module exports', () => {
  it('abis', () => {
    // Ensure dynamic abi lookup doesn't invalidate existing dependents.
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0),
        AzraelV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0),
        SylvesterV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0),
        SylvesterV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0),
        SylvesterV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0),
        WhoopiV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0),
        WhoopiV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0),
        ResolverV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0),
        ResolverV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0),
        ResolverV0Abi
      )
    ).to.be.true;
    expect(
      isEqual(
        getDeploymentAbi(DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0),
        ResolverV0Abi
      )
    ).to.be.true;
  });
  it('readme compatibility', () => {
    // @ts-expect-error
    const wallet: Signer = null;
    const renft = getRenftContract({
      deployment: DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
      signer: wallet,
    });
    // HACK: Here we ensure that the returned interface matches the provided deployment.
    const azrael: AzraelV0FunctionInterface = renft;
    expect(!!azrael).to.be.true;
  });
});
