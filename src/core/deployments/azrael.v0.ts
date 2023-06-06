import abi from '../../abi/azrael.v0';
import { NETWORK_ETHEREUM_MAINNET } from '../consts';
import {
  AzraelVersion,
  DeploymentDefinition,
  RenftContractType,
} from '../types';

export const DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0: DeploymentDefinition<
  RenftContractType.AZRAEL,
  AzraelVersion.V0
> = {
  abi,
  contractAddress: '0x94D8f036a0fbC216Bb532D33bDF6564157Af0cD7',
  contractType: RenftContractType.AZRAEL,
  network: NETWORK_ETHEREUM_MAINNET,
  startBlock: 12875508,
  version: AzraelVersion.V0,
};
