import { expect } from 'chai';

import {
  DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1,
  findSingleDeploymentOrThrow,
  isValidDeployment,
  RenftContractType,
  RENFT_CONTRACT_DEPLOYMENTS,
} from '../src';

describe('deployments', () => {
  const validDeployment = DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1;

  it('all deployments are valid', () => {
    expect(RENFT_CONTRACT_DEPLOYMENTS.map(isValidDeployment).every(Boolean)).to
      .be.true;
  });

  describe('isValidDeployment', () => {
    it('false for invalid contractAddress', () => {
      expect(
        isValidDeployment({
          ...validDeployment,
          contractAddress: '0x0000000',
        })
      ).to.be.false;
    });

    it('false for invalid startBlock', () => {
      expect(
        isValidDeployment({
          ...validDeployment,
          startBlock: -1,
        })
      ).to.be.false;
    });
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
      expect(
        findSingleDeploymentOrThrow({
          contractAddress: validDeployment.contractAddress,
        })
      ).to.equal(validDeployment);
    });
  });
});
