import {
  Account,
  PublicClient,
  SimulateContractReturnType,
  WalletClient,
  WriteContractReturnType,
} from 'viem';

import { Deployment } from '../core';

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
  deployment,
  publicClient,
  walletClient,
}: {
  account: Account;
  deployment: Deployment;
  publicClient: PublicClient;
  walletClient: WalletClient;
}): Executor {
  const { abi, contractAddress: address } = deployment;

  const prepare: Simulator = async (functionName, args) =>
    publicClient.simulateContract({
      abi,
      account,
      address, // TODO
      args,
      functionName,
    });

  const exec: Executor = async (functionName, args) => {
    const { request } = await prepare(functionName, args);
    return walletClient.writeContract(request);
  };

  return exec;
}
