import {
  DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
  DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
  DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  RenftContractType,
  RenftContractVersions,
} from '../../core';
import { SDKInterface } from '../base';
import SylvesterBaseSDK from './Sylvester.base';

export default class SylvesterV0SDK<
  ContractType extends RenftContractType,
  ContractVersion extends RenftContractVersions[ContractType]
> extends SylvesterBaseSDK<ContractType, ContractVersion> {
  protected supportedDeployments = [
    DEPLOYMENT_SYLVESTER_ETHEREUM_GOERLI_TESTNET_V0,
    DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0,
    DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0,
  ];

  constructor(args: SDKInterface<ContractType, ContractVersion>) {
    super(args);
    super.validate(this.supportedDeployments);
  }
}
