import abi from '../../abi/sylvester.v0';
import {
  NETWORK_ETHEREUM_GOERLI_TESTNET,
  NETWORK_ETHEREUM_MAINNET,
  NETWORK_POLYGON_MAINNET,
} from '../consts';
import { RenftContractType, SylvesterVersion } from '../types';

export const DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0 = {
  abi,
  contractAddress: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_ETHEREUM_MAINNET,
  startBlock: 13197348,
  version: SylvesterVersion.V0,
};

export const DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0 = {
  abi,
  contractAddress: '0xEDe9A15388CCd972DffBD7C3F5504345703b63b2',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_ETHEREUM_GOERLI_TESTNET,
  startBlock: 8907139,
  version: SylvesterVersion.V0,
};

// TODO
// @deprecated - Please use the v1 contract below.
export const DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0 = {
  abi,
  contractAddress: '0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe',
  contractType: RenftContractType.SYLVESTER,
  network: NETWORK_POLYGON_MAINNET,
  startBlock: 28399140,
  version: SylvesterVersion.V0,
};
