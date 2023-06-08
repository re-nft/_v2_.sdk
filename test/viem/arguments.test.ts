import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  NFTStandard,
  PaymentToken,
} from '../../src';
import {
  AzraelV0Abi,
  SylvesterV0Abi,
  SylvesterV1Abi,
  WhoopiV0Abi,
} from '../../src/abi';
import {
  AzraelV0SDK,
  SylvesterV0SDK,
  SylvesterV1SDK,
  WhoopiV0SDK,
} from '../../src/viem';
import {
  account,
  chain,
  publicClient,
  receiverAddress,
  walletClient,
} from './fixtures';

const assetAddress = '0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69';

beforeEach(() => {
  jest.spyOn(publicClient, 'simulateContract');
  jest.spyOn(walletClient, 'writeContract');

  // @ts-expect-error This is mocked.
  publicClient.simulateContract.mockImplementation(args =>
    Promise.resolve({ request: { ...args, chain } })
  );
  // @ts-expect-error This is mocked.
  walletClient.writeContract.mockImplementation(() => Promise.resolve());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SDK interfaces', () => {
  it('AzraelV0SDK', async () => {
    const sdk = new AzraelV0SDK({
      account,
      deployment: DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
      publicClient,
      walletClient,
    });

    await sdk.lend(
      [assetAddress],
      ['1'],
      [1],
      [7],
      [25],
      [50],
      [PaymentToken.WETH]
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: AzraelV0Abi,
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

    await sdk.rent([assetAddress], ['1'], ['1'], [7]);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: AzraelV0Abi,
      account,
      address: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
      args: [['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'], ['1'], ['1'], [7]],
      functionName: 'rent',
    });

    await sdk.returnIt([assetAddress], ['1'], ['1']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: AzraelV0Abi,
      account,
      address: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
      args: [['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'], ['1'], ['1']],
      functionName: 'returnIt',
    });

    await sdk.claimCollateral([assetAddress], ['1'], ['1']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: AzraelV0Abi,
      account,
      address: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
      args: [['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'], ['1'], ['1']],
      functionName: 'claimCollateral',
    });

    await sdk.stopLending([assetAddress], ['1'], ['1']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: AzraelV0Abi,
      account,
      address: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
      args: [['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'], ['1'], ['1']],
      functionName: 'stopLending',
    });
  });

  it('SylvesterV0SDK', async () => {
    const sdk = new SylvesterV0SDK({
      account,
      deployment: DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
      publicClient,
      walletClient,
    });

    await sdk.lend(
      [NFTStandard.E1155],
      [assetAddress],
      ['1'],
      [1],
      [7],
      [25],
      [PaymentToken.WETH]
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: SylvesterV0Abi,
      account,
      address: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
      args: [
        [1],
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'],
        ['1'],
        [1],
        [7],
        ['0x00190000'],
        [1],
      ],
      functionName: 'lend',
    });

    await sdk.rent(
      [NFTStandard.E1155],
      [assetAddress],
      ['1'],
      ['1'],
      [7],
      ['1']
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: SylvesterV0Abi,
      account,
      address: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
      args: [
        [1],
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'],
        ['1'],
        ['1'],
        [7],
        ['1'],
      ],
      functionName: 'rent',
    });

    await sdk.stopRent(
      [NFTStandard.E1155],
      [assetAddress],
      ['1'],
      ['1'],
      ['1']
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: SylvesterV0Abi,
      account,
      address: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
      args: [
        [1],
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'],
        ['1'],
        ['1'],
        ['1'],
      ],
      functionName: 'stopRent',
    });

    await sdk.claimRent(
      [NFTStandard.E1155],
      [assetAddress],
      ['1'],
      ['1'],
      ['1']
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: SylvesterV0Abi,
      account,
      address: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
      args: [
        [1],
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'],
        ['1'],
        ['1'],
        ['1'],
      ],
      functionName: 'claimRent',
    });

    await sdk.stopLend([NFTStandard.E1155], [assetAddress], ['1'], ['1']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: SylvesterV0Abi,
      account,
      address: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
      args: [[1], ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'], ['1'], ['1']],
      functionName: 'stopLend',
    });
  });

  // Since Sylvester V1 only overwrites `sdk.lend()` to support the
  // `willAutoRenew` parameter we don't have to test the other methods.
  it('SylvesterV1SDK', async () => {
    const sdk = new SylvesterV1SDK({
      account,
      deployment: DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
      publicClient,
      walletClient,
    });

    await sdk.lend(
      [NFTStandard.E1155],
      [assetAddress],
      ['1'],
      [1],
      [7],
      [25],
      [PaymentToken.WETH],
      [true]
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: SylvesterV1Abi,
      account,
      address: '0x4e52B73Aa28b7FF84d88eA3A90C0668f46043450',
      args: [
        [1],
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69'],
        ['1'],
        [1],
        [7],
        ['0x00190000'],
        [1],
        [1],
      ],
      functionName: 'lend',
    });
  });

  it('WhoopiV0SDK', async () => {
    const sdk = new WhoopiV0SDK({
      account,
      deployment: DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
      publicClient,
      walletClient,
    });

    await sdk.lend(
      assetAddress,
      ['1'],
      ['25'],
      [[receiverAddress]],
      [[25, 75]],
      [7],
      [PaymentToken.ACS],
      [[receiverAddress]]
    );

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: WhoopiV0Abi,
      account,
      address: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
      args: [
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69', ['1'], ['0']],
        [BigInt('0x015af1d78b58c40000')],
        [[['0x70997970C51812dc3A010C7d01b50e0d17dc79C8']]],
        [[['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'], [25, 75]]],
        [7],
        [7],
      ],
      functionName: 'lend',
    });

    await sdk.rent(assetAddress, ['1'], ['1'], [7]);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: WhoopiV0Abi,
      account,
      address: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
      args: [['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69', ['1'], ['1']], [7]],
      functionName: 'rent',
    });

    await sdk.stopRent(assetAddress, ['1'], ['1']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: WhoopiV0Abi,
      account,
      address: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
      args: ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69', ['1'], ['1']],
      functionName: 'stopRent',
    });

    await sdk.stopLend(assetAddress, ['1'], ['1']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: WhoopiV0Abi,
      account,
      address: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
      args: [['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69', ['1'], ['1']]],
      functionName: 'stopLend',
    });

    await sdk.pay(assetAddress, ['1'], ['1'], [receiverAddress], ['25']);

    expect(publicClient.simulateContract).toBeCalledWith({
      abi: WhoopiV0Abi,
      account,
      address: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
      args: [
        ['0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69', ['1'], ['1']],
        ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'],
        ['25'],
      ],
      functionName: 'pay',
    });
  });
});
