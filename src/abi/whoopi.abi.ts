import {getDeploymentAbi} from '../consts';
import {RenftContractType, WhoopiVersion} from '../types';

export default {
  abi: getDeploymentAbi({
    contractType: RenftContractType.WHOOPI,
    version: WhoopiVersion.V0,
  }),
};
