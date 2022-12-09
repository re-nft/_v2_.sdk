import {AzraelVersion, RenftContractType, SylvesterVersion, WhoopiVersion} from '../types';

import {AzraelInterfaceVersions} from './azrael/types';
import {SylvesterInterfaceVersions} from './sylvester/types';
import {WhoopiInterfaceVersions} from './whoopi/types';
import {Contract} from "@ethersproject/contracts";
import {
  createAzraelV0ClaimCollateralThunk,
  createAzraelV0LendThunk,
  createAzraelV0RentThunk,
  createAzraelV0ReturnItThunk, createAzraelV0StopLendingThunk
} from "./azrael/utils";
import {
  createSylvesterV0ClaimCollateralThunk,
  createSylvesterV0LendThunk,
  createSylvesterV0RentThunk,
  createSylvesterV0ReturnItThunk, createSylvesterV0StopLendingThunk
} from "./sylvester/utils";
import {
  createWhoopiV0LendThunk, createWhoopiV0PayThunk,
  createWhoopiV0RentThunk,
  createWhoopiV0StopLendingThunk,
  createWhoopiV0StopRentThunk
} from "./whoopi/utils";

export type CreateVersionedContractInterfaceResult = {
  readonly [RenftContractType.AZRAEL]: AzraelInterfaceVersions;
  readonly [RenftContractType.SYLVESTER]: SylvesterInterfaceVersions;
  readonly [RenftContractType.WHOOPI]: WhoopiInterfaceVersions;
};

const createAzraelInterfaceVersionsThunk = (
  contract: Contract
): AzraelInterfaceVersions => ({
  [AzraelVersion.V0]: {
    lend: createAzraelV0LendThunk(contract),
    rent: createAzraelV0RentThunk(contract),
    returnIt: createAzraelV0ReturnItThunk(contract),
    claimCollateral: createAzraelV0ClaimCollateralThunk(contract),
    stopLending: createAzraelV0StopLendingThunk(contract),
  },
});

const createSylvesterInterfaceVersionsThunk = (
  contract: Contract
): SylvesterInterfaceVersions => ({
  [SylvesterVersion.V0]: {
    lend: createSylvesterV0LendThunk(contract),
    rent: createSylvesterV0RentThunk(contract),
    returnIt: createSylvesterV0ReturnItThunk(contract),
    claimCollateral: createSylvesterV0ClaimCollateralThunk(contract),
    stopLending: createSylvesterV0StopLendingThunk(contract),
  },
});

const createWhoopiInterfaceVersionsThunk = (
  contract: Contract
): WhoopiInterfaceVersions => ({
  [WhoopiVersion.V0]: {
    lend: createWhoopiV0LendThunk(contract),
    rent: createWhoopiV0RentThunk(contract),
    stopRent: createWhoopiV0StopRentThunk(contract),
    stopLending: createWhoopiV0StopLendingThunk(contract),
    pay: createWhoopiV0PayThunk(contract),
  },
});

export const createInterfaceVersions = (
  contract: Contract
): CreateVersionedContractInterfaceResult => ({
  [RenftContractType.AZRAEL]: createAzraelInterfaceVersionsThunk(contract),
  [RenftContractType.SYLVESTER]: createSylvesterInterfaceVersionsThunk(contract),
  [RenftContractType.WHOOPI]: createWhoopiInterfaceVersionsThunk(contract),
})

