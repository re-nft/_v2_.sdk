import { Account, PublicClient, WalletClient } from 'viem';

import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  ValidDeployment,
} from '../core';
import { getInterface } from './contracts';
import { makeExecutor } from './executor';

export function getRenftContract(args: {
  account: Account;
  deployment: ValidDeployment;
  publicClient: PublicClient;
  walletClient: WalletClient;
}) {
  const { deployment } = args;
  const exec = makeExecutor(args);
  const SDK = getInterface(deployment);

  const testSDK = getInterface(DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0);
  const testSDK2 = getInterface(DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0);

  return new SDK(exec, deployment.network.type);
}
