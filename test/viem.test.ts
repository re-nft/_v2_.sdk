import { TextDecoder, TextEncoder } from 'util';
Object.assign(globalThis, { TextDecoder, TextEncoder });

import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { foundry } from 'viem/chains';

import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  RENFT_CONTRACT_DEPLOYMENTS,
  RenftContractType,
  SylvesterVersion,
} from '../src';
import AzrealV0Abi from '../src/abi/azrael.v0';
import {
  AzrealV0SDK,
  SylvesterV0SDK,
  SylvesterV1SDK,
  WhoopiV0SDK,
} from '../src/viem';

const publicClient = createPublicClient({
  chain: foundry,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: foundry,
  transport: http(),
});

const account = privateKeyToAccount(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
);

const assetAddress = '0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69';

jest.spyOn(publicClient, 'simulateContract');
jest.spyOn(walletClient, 'writeContract');

describe('SDK interfaces', () => {
  it('should only allow valid deployments', () => {
    RENFT_CONTRACT_DEPLOYMENTS.forEach(deployment => {
      if (deployment.contractType === RenftContractType.AZRAEL) {
        expect(
          Reflect.getPrototypeOf(
            new AzrealV0SDK({ account, deployment, publicClient, walletClient })
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
            new AzrealV0SDK({ account, deployment, publicClient, walletClient })
        ).toThrow('Invalid deployment supplied');
      }

      if (
        deployment.contractType === RenftContractType.SYLVESTER &&
        deployment.version === SylvesterVersion.V0
      ) {
        expect(
          Reflect.getPrototypeOf(
            // @ts-expect-error this is not null because we know SylvesterV0SDK
            // inherits from SylvesterBaseSDK.
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
            // inherits from SylvesterBaseSDK.
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

  it('fires', () => {
    const sdk = new AzrealV0SDK({
      account,
      deployment: DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
      publicClient,
      walletClient,
    });

    sdk.lend([assetAddress], ['1'], [1], [7], [25], [50], [1]);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: AzrealV0Abi,
      account,
      address: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
      args: [
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'],
        ['1'],
        [1],
        [7],
        ['0x00190000'],
        ['0x00320000'],
        [1],
      ],
      functionName: 'lend',
    });
  });
});
