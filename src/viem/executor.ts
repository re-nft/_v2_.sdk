import {
  Account,
  PublicClient,
  SimulateContractReturnType,
  WalletClient,
  WriteContractReturnType,
} from 'viem';

import { ValidDeployment } from '../core';

export type Simulator = (
  functionName: string,
  args: any
) => Promise<SimulateContractReturnType>;

export type Executor = (
  functionName: string,
  args: any
) => Promise<WriteContractReturnType>;

export abstract class SDK {
  protected exec: Executor;
  constructor(exec: Executor) {
    this.exec = exec;
  }
}

export function makeExecutor({
  account,
  deployment: { abi, contractAddress: address },
  publicClient,
  walletClient,
}: {
  account: Account;
  deployment: ValidDeployment;
  publicClient: PublicClient;
  walletClient: WalletClient;
}): Executor {
  const prepare: Simulator = async (functionName, args) =>
    publicClient.simulateContract({
      abi,
      account,
      // @ts-expect-error current SDK TS version doesn't support this
      address,
      args,
      functionName,
    });

  const exec: Executor = async (functionName, args) => {
    const { request } = await prepare(functionName, args);
    return walletClient.writeContract(request);
  };

  return exec;
}
