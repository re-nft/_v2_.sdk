import { Contract } from '@ethersproject/contracts';

import {
  AzraelVersion,
  CreateVersionedContractInterfaceResult,
  RenftContractType,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
} from '../types';

import {
  AzraelInterfaceVersions,
  createAzraelV0ClaimCollateralThunk,
  createAzraelV0LendThunk,
  createAzraelV0RentThunk,
  createAzraelV0ReturnItThunk,
  createAzraelV0StopLendingThunk,
  createSylvesterV0ClaimCollateralThunk,
  createSylvesterV0LendThunk,
  createSylvesterV0RentThunk,
  createSylvesterV0ReturnItThunk,
  createSylvesterV0StopLendingThunk,
  SylvesterInterfaceVersions,
  createWhoopiV0LendThunk,
  createWhoopiV0PayThunk,
  createWhoopiV0RentThunk,
  createWhoopiV0StopLendingThunk,
  createWhoopiV0StopRentThunk,
  WhoopiInterfaceVersions,
  ResolverInterfaceVersions,
  createSylvesterV1LendThunk,
} from '../contracts';

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
  [SylvesterVersion.V1]: {
    lend: createSylvesterV1LendThunk(contract),
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

const createResolverInterfaceVersionsThunk = (): ResolverInterfaceVersions => ({
  // TODO: What arguments to use here?
  [ResolverVersion.V0]: {},
  [ResolverVersion.V1]: {},
});

export const createInterfaceVersions = (
  contract: Contract
): CreateVersionedContractInterfaceResult => ({
  [RenftContractType.AZRAEL]: createAzraelInterfaceVersionsThunk(contract),
  [RenftContractType.SYLVESTER]: createSylvesterInterfaceVersionsThunk(
    contract
  ),
  [RenftContractType.WHOOPI]: createWhoopiInterfaceVersionsThunk(contract),
  [RenftContractType.RESOLVER]: createResolverInterfaceVersionsThunk(),
});
