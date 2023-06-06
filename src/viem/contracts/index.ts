import {
  DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1,
  DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0,
  DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0,
} from '../../core/deployments';
import {
  AzraelVersion,
  DeploymentDefinition,
  RenftContractType,
  SylvesterVersion,
  WhoopiVersion,
} from '../../core/types';
import { default as AzrealV0SDK } from './Azrael.v0';
import { default as SylvesterV0SDK } from './Sylvester.v0';
import { default as SylvesterV1SDK } from './Sylvester.v1';
import { default as WhoopiV0SDK } from './Whoopi.v0';

type AzraelSDKVersions = {
  [AzraelVersion.V0]: AzrealV0SDK;
};
type SylvesterSDKVersions = {
  [SylvesterVersion.V0]: SylvesterV0SDK;
  [SylvesterVersion.V1]: SylvesterV1SDK;
};
type WhoopiSDKVersions = {
  [WhoopiVersion.V0]: WhoopiV0SDK;
};

type VersionedContractInterface = {
  [RenftContractType.AZRAEL]: AzraelSDKVersions;
  [RenftContractType.SYLVESTER]: SylvesterSDKVersions;
  [RenftContractType.WHOOPI]: WhoopiSDKVersions;
};

export function getInterface<
  ContractType extends keyof VersionedContractInterface,
  ContractVersion extends keyof VersionedContractInterface[ContractType]
>(
  deployment: DeploymentDefinition<ContractType, ContractVersion>
): VersionedContractInterface[ContractType][ContractVersion] {
  switch (deployment) {
    case DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0:
      return AzrealV0SDK;
    case DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0:
    case DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0:
    case DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0:
      return SylvesterV0SDK;
    case DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1:
      return SylvesterV1SDK;
    case DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0:
    case DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0:
      return WhoopiV0SDK;
    default:
      throw new Error(`Invalid deployment supplied: ${deployment}`);
  }
}
