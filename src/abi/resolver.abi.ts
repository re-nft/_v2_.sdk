import {getDeploymentAbi} from '../consts';
import {RenftContractType, ResolverVersion} from '../types';

export default {
  abi: getDeploymentAbi({
    contractType: RenftContractType.RESOLVER,
    version: ResolverVersion.V0,
  }),
};
