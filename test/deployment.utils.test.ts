import { isAddress } from '@ethersproject/address';
import { expect } from 'chai';

import {
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1,
  findSingleDeploymentOrThrow,
  RenftContractType,
  RENFT_CONTRACT_DEPLOYMENTS,
} from '../src';

describe('deployments', () => {
  it('addresses are checksummed', () => {
    expect(
      RENFT_CONTRACT_DEPLOYMENTS.map(deployment =>
        isAddress(deployment.contractAddress)
      ).every(Boolean)
    ).to.be.true;
  });

  describe('findSingleDeploymentOrThrow', () => {
    it('throws if no deployment found', () => {
      expect(() =>
        findSingleDeploymentOrThrow({ contractAddress: '0x0000000' })
      ).to.throw();
    });

    it('throws if multiple deployments found', () => {
      expect(() =>
        findSingleDeploymentOrThrow({
          contractType: RenftContractType.RESOLVER,
        })
      ).to.throw();
    });

    it('finds by contract address', () => {
      const deployment = DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1;
      expect(
        findSingleDeploymentOrThrow({
          contractAddress: deployment.contractAddress,
        })
      ).to.equal(deployment);
    });
  });
});
