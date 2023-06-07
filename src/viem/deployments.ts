import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
} from '../core/deployments';
import {
  AzraelVersion,
  Network,
  RenftContractType,
  SylvesterVersion,
  WhoopiVersion,
} from '../core/types';

export const SDKDeployments = {
  [RenftContractType.AZRAEL]: {
    [AzraelVersion.V0]: [DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0],
  },
  [RenftContractType.SYLVESTER]: {
    [SylvesterVersion.V0]: [
      DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
      DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
      DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
    ],
    [SylvesterVersion.V1]: [DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1],
  },
  [RenftContractType.WHOOPI]: {
    [WhoopiVersion.V0]: [
      DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
      DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
    ],
  },
};

export type SupportedSDKInterfaces = typeof SDKDeployments;

export type DeploymentDefinition<
  ContractType extends keyof SupportedSDKInterfaces,
  ContractVersion extends keyof SupportedSDKInterfaces[ContractType]
> = {
  readonly abi: any;
  readonly contractAddress: string;
  readonly contractType: ContractType;
  readonly network: Network;
  readonly startBlock: number;
  readonly version: ContractVersion;
};
