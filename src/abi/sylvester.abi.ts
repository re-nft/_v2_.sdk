import {getDeploymentAbi} from '../consts';
import {RenftContractType, SylvesterVersion} from '../types';

export default {
  abi: getDeploymentAbi({
    contractType: RenftContractType.SYLVESTER,
    version: SylvesterVersion.V0,
  }),
};
