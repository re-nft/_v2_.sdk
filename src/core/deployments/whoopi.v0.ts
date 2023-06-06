import abi from '../../abi/whoopi.v0';
import {
  NETWORK_AVALANCHE_FUJI_TESTNET,
  NETWORK_AVALANCHE_MAINNET,
} from '../consts';
import {
  DeploymentDefinition,
  RenftContractType,
  WhoopiVersion,
} from '../types';

export const DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0: DeploymentDefinition = {
  abi,
  contractAddress: '0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084',
  contractType: RenftContractType.WHOOPI,
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  startBlock: 11500156,
  version: WhoopiVersion.V0,
} as const;

export const DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0: DeploymentDefinition = {
  abi,
  contractAddress: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
  contractType: RenftContractType.WHOOPI,
  network: NETWORK_AVALANCHE_MAINNET,
  startBlock: 19408332,
  version: WhoopiVersion.V0,
} as const;
