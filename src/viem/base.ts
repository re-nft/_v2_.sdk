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
  RenftContractVersion,
  RenftContractVersions,
} from '../core/types';

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
  protected deployment: Deployment<RenftContractType, RenftContractVersion>;
  protected exec: Executor;
  protected network: EVMNetworkType;
  protected supportedDeployments: Deployment<
    RenftContractType,
    RenftContractVersion
  >[] = [];

  constructor({
    account,
    deployment,
    publicClient,
    walletClient,
  }: SDKInterface<ContractType, ContractVersion>) {
    this.deployment = deployment;
    this.validate(this.supportedDeployments);

    const prepare: Simulator = async (functionName, args) =>
      publicClient.simulateContract({
        abi: deployment.abi,
        account,
        // @ts-ignore something about tsdx is messing this up
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

  protected validate(
    deploymentList: Deployment<RenftContractType, RenftContractVersion>[]
  ): void {
    const { contractType, version } = this.deployment;
    if (deploymentList.length && !deploymentList.includes(this.deployment)) {
      throw new Error(
        `Invalid deployment supplied for ${this.constructor.name}: ${contractType}.${version}`
      );
    }
  }
}
