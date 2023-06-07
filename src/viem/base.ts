import {
  Account,
  PublicClient,
  SimulateContractReturnType,
  WalletClient,
  WriteContractReturnType,
} from 'viem';

import { EVMNetworkType } from '../core/types';
import {
  DeploymentDefinition,
  SDKDeployments,
  SupportedSDKInterfaces,
} from './deployments';

export type Simulator = (
  functionName: string,
  args: any
) => Promise<SimulateContractReturnType>;

export type Executor = (
  functionName: string,
  args: any
) => Promise<WriteContractReturnType>;

export type SDKInterface<
  ContractType extends keyof SupportedSDKInterfaces,
  ContractVersion extends keyof SupportedSDKInterfaces[ContractType]
> = {
  account: Account;
  deployment: DeploymentDefinition<ContractType, ContractVersion>;
  publicClient: PublicClient;
  walletClient: WalletClient;
};

export abstract class SDK<
  ContractType extends keyof SupportedSDKInterfaces,
  ContractVersion extends keyof SupportedSDKInterfaces[ContractType]
> {
  protected exec: Executor;
  protected network: EVMNetworkType;

  constructor({
    account,
    deployment,
    publicClient,
    walletClient,
  }: SDKInterface<ContractType, ContractVersion>) {
    const { contractType, version } = deployment;

    // @ts-ignore 🤷
    if (!SDKDeployments?.[contractType]?.[version]?.includes(deployment))
      throw new Error(
        `Invalid deployment supplied: ${contractType}.${version}`
      );

    const prepare: Simulator = async (functionName, args) =>
      publicClient.simulateContract({
        abi: deployment.abi,
        account,
        // @ts-ignore current SDK TS version doesn't support this
        address: deployment.contractAddress,
        args,
        functionName,
      });

    const exec: Executor = async (functionName, args) => {
      const { request } = await prepare(functionName, args);
      return walletClient.writeContract(request);
    };

    this.exec = exec;
    this.network = deployment.network.type;
  }
}
