import {
  RENFT_CONTRACT_DEPLOYMENTS,
  RenftContractType,
  SylvesterVersion,
} from '../../src';
import {
  AzraelV0SDK,
  SylvesterV0SDK,
  SylvesterV1SDK,
  WhoopiV0SDK,
} from '../../src/viem';
import { account, publicClient, walletClient } from './fixtures';

it('should only allow valid deployments', () => {
  RENFT_CONTRACT_DEPLOYMENTS.forEach(deployment => {
    if (deployment.contractType === RenftContractType.AZRAEL) {
      expect(
        Reflect.getPrototypeOf(
          new AzraelV0SDK({ account, deployment, publicClient, walletClient })
        )
      ).toEqual({
        claimCollateral: expect.any(Function),
        constructor: expect.any(Function),
        lend: expect.any(Function),
        rent: expect.any(Function),
        returnIt: expect.any(Function),
        stopLending: expect.any(Function),
      });
    } else {
      expect(
        () =>
          // @ts-expect-error we know deployments don't match
          new AzraelV0SDK({ account, deployment, publicClient, walletClient })
      ).toThrow('Invalid deployment supplied');
    }

    if (
      deployment.contractType === RenftContractType.SYLVESTER &&
      deployment.version === SylvesterVersion.V0
    ) {
      expect(
        Reflect.getPrototypeOf(
          // @ts-expect-error this is not null because we know SylvesterV0SDK
          // inherits from SylvesterBaseSDK. Hence the double Reflect.
          Reflect.getPrototypeOf(
            new SylvesterV0SDK({
              account,
              deployment,
              publicClient,
              walletClient,
            })
          )
        )
      ).toEqual({
        claimRent: expect.any(Function),
        constructor: expect.any(Function),
        lend: expect.any(Function),
        rent: expect.any(Function),
        stopLend: expect.any(Function),
        stopRent: expect.any(Function),
      });
    } else {
      expect(
        () =>
          new SylvesterV0SDK({
            account,
            // @ts-expect-error we know deployments don't match
            deployment,
            publicClient,
            walletClient,
          })
      ).toThrow('Invalid deployment supplied');
    }

    if (
      deployment.contractType === RenftContractType.SYLVESTER &&
      deployment.version === SylvesterVersion.V1
    ) {
      expect(
        Reflect.getPrototypeOf(
          // @ts-expect-error this is not null because we know SylvesterV0SDK
          // inherits from SylvesterBaseSDK. Hence the double Reflect
          Reflect.getPrototypeOf(
            new SylvesterV1SDK({
              account,
              deployment,
              publicClient,
              walletClient,
            })
          )
        )
      ).toEqual({
        claimRent: expect.any(Function),
        constructor: expect.any(Function),
        lend: expect.any(Function),
        rent: expect.any(Function),
        stopLend: expect.any(Function),
        stopRent: expect.any(Function),
      });
    } else {
      expect(
        () =>
          new SylvesterV1SDK({
            account,
            // @ts-expect-error we know deployments don't match
            deployment,
            publicClient,
            walletClient,
          })
      ).toThrow('Invalid deployment supplied');
    }

    if (deployment.contractType === RenftContractType.WHOOPI) {
      expect(
        Reflect.getPrototypeOf(
          new WhoopiV0SDK({
            account,
            deployment,
            publicClient,
            walletClient,
          })
        )
      ).toEqual({
        constructor: expect.any(Function),
        lend: expect.any(Function),
        pay: expect.any(Function),
        rent: expect.any(Function),
        stopLend: expect.any(Function),
        stopRent: expect.any(Function),
      });
    } else {
      expect(
        () =>
          new WhoopiV0SDK({
            account,
            // @ts-expect-error we know deployments don't match
            deployment,
            publicClient,
            walletClient,
          })
      ).toThrow('Invalid deployment supplied');
    }
  });
});
