import {
  Account,
  PublicClient,
  SimulateContractReturnType,
  WalletClient,
  WriteContractReturnType,
} from 'viem';

import {
  Deployment,
  EVMNetworkType,
  RenftContractType,
  RenftContractVersions,
} from '../core/types';
import { SDKDeployments } from './deployments';

export type Simulator = (
  functionName: string,
  args: any
) => Promise<SimulateContractReturnType>;

export type Executor = (
  functionName: string,
  args: any
) => Promise<WriteContractReturnType>;

export type SDKInterface<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> = {
  account: Account;
  deployment: Deployment<ContractType, ContractVersion>;
  publicClient: PublicClient;
  walletClient: WalletClient;
};

export abstract class SDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
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
