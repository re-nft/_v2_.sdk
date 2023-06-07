import abi from '../../abi/sylvester.v1';
import { NETWORK_POLYGON_MAINNET } from '../consts';
import { RenftContractType, SylvesterVersion } from '../types';

export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1 = {
  abi,
  contractAddress: '0x4e52B73Aa28b7FF84d88eA3A90C0668f46043450',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 36825974,
  version: SylvesterVersion.V1,
};
