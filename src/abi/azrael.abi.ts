import {getDeploymentAbi,} from '../consts';
import {AzraelVersion, RenftContractType} from "../types";

export default {
  abi: getDeploymentAbi({
    contractType: RenftContractType.AZRAEL,
    version: AzraelVersion.V0,
  }),
};
