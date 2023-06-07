import abi from '../../abi/resolver.v1';
import { NETWORK_POLYGON_MAINNET } from '../consts';
import { RenftContractType, ResolverVersion } from '../types';

export const DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1 = {
  abi,
  contractAddress: '0x3ddC85bB768A11B0125f4ee71CfeA54e54653366',
  contractType: RenftContractType.RESOLVER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 36825213,
  version: ResolverVersion.V1,
};
