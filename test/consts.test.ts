import {Signer} from '@ethersproject/abstract-signer';
import { expect } from 'chai';

import {
  RESOLVER_ADDRESS,
  AZRAEL_ADDRESS,
  SYLVESTER_ADDRESS,
  RESOLVER_POLYGON_ADDRESS,
  SYLVESTER_POLYGON_ADDRESS,
  RESOLVER_AVALANCHE_ADDRESS,
  WHOOPI_AVALANCHE_ADDRESS,
  WHOOPI_FUJI_ADDRESS,
  RESOLVER_FUJI_ADDRESS,
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
  getRenftContract,
  AzraelV0FunctionInterface,
  SylvesterV0FunctionInterface,
  WhoopiV0FunctionInterface,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  SylvesterV1FunctionInterface,
} from '../src';

describe('deprecated contract addresses', () => {
  it('should not invalidate current consumers', () => {
    expect(RESOLVER_ADDRESS).to.equal('0x945e589a4715d1915e6fe14f08e4887bc4019341');
    expect(AZRAEL_ADDRESS).to.equal('0x94d8f036a0fbc216bb532d33bdf6564157af0cd7');
    expect(SYLVESTER_ADDRESS).to.equal('0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a');
    expect(RESOLVER_POLYGON_ADDRESS).to.equal('0x6884d88Ce56C5C93F46eE23684eBA8628c90B518');
    expect(SYLVESTER_POLYGON_ADDRESS).to.equal('0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe');
    expect(RESOLVER_AVALANCHE_ADDRESS).to.equal('0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A');
    expect(WHOOPI_AVALANCHE_ADDRESS).to.equal('0x6Ee495ecEd3A0255057667FF2685e53f54A19A65');
    expect(WHOOPI_FUJI_ADDRESS).to.equal('0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084');
    expect(RESOLVER_FUJI_ADDRESS).to.equal('0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D');
  });

  it('interface typing', () => {
    // @ts-expect-error this is an invalid assertion
    const signer: Signer = null;

    const azrael: AzraelV0FunctionInterface = getRenftContract({
      deployment: DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
      signer,
    });

    const sylvester: SylvesterV0FunctionInterface = getRenftContract({
      deployment: DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
      signer,
    });

    const whoopi: WhoopiV0FunctionInterface = getRenftContract({
      deployment: DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
      signer,
    });

    const sylvesterv1: SylvesterV1FunctionInterface = getRenftContract({
      deployment: DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
      signer,
    });

    expect(!!azrael).to.be.true;
    expect(!!sylvester).to.be.true;
    expect(!!whoopi).to.be.true;
    expect(!!sylvesterv1).to.be.true;

  });
});
