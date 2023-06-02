import { Contract } from '@ethersproject/contracts';

import {
  AzraelVersion,
  EVMNetworkType,
  RenftContractType,
  ResolverVersion,
  SylvesterVersion,
  WhoopiVersion,
} from '../core';
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
  createSylvesterV1LendThunk,
  createWhoopiV0LendThunk,
  createWhoopiV0PayThunk,
  createWhoopiV0RentThunk,
  createWhoopiV0StopLendingThunk,
  createWhoopiV0StopRentThunk,
  ResolverInterfaceVersions,
  SylvesterInterfaceVersions,
  WhoopiInterfaceVersions,
} from './contracts';
import { CreateVersionedContractInterfaceResult } from './types';

const createAzraelInterfaceVersionsThunk = (
  contract: Contract
): AzraelInterfaceVersions => ({
  [AzraelVersion.V0]: {
    claimCollateral: createAzraelV0ClaimCollateralThunk(contract),
    lend: createAzraelV0LendThunk(contract),
    rent: createAzraelV0RentThunk(contract),
    returnIt: createAzraelV0ReturnItThunk(contract),
    stopLending: createAzraelV0StopLendingThunk(contract),
  },
});

const createSylvesterInterfaceVersionsThunk = (
  contract: Contract
): SylvesterInterfaceVersions => ({
  [SylvesterVersion.V0]: {
    claimCollateral: createSylvesterV0ClaimCollateralThunk(contract),
    lend: createSylvesterV0LendThunk(contract),
    rent: createSylvesterV0RentThunk(contract),
    returnIt: createSylvesterV0ReturnItThunk(contract),
    stopLending: createSylvesterV0StopLendingThunk(contract),
  },
  [SylvesterVersion.V1]: {
    claimCollateral: createSylvesterV0ClaimCollateralThunk(contract),
    lend: createSylvesterV1LendThunk(contract),
    rent: createSylvesterV0RentThunk(contract),
    returnIt: createSylvesterV0ReturnItThunk(contract),
    stopLending: createSylvesterV0StopLendingThunk(contract),
  },
});

const createWhoopiInterfaceVersionsThunk = (
  contract: Contract,
  network: EVMNetworkType
): WhoopiInterfaceVersions => ({
  [WhoopiVersion.V0]: {
    lend: createWhoopiV0LendThunk(contract, network),
    pay: createWhoopiV0PayThunk(contract),
    rent: createWhoopiV0RentThunk(contract),
    stopLending: createWhoopiV0StopLendingThunk(contract),
    stopRent: createWhoopiV0StopRentThunk(contract),
  },
});

const createResolverInterfaceVersionsThunk = (): ResolverInterfaceVersions => ({
  // TODO: What arguments to use here?
  [ResolverVersion.V0]: {},
  [ResolverVersion.V1]: {},
});

export const createInterfaceVersions = (
  contract: Contract,
  network: EVMNetworkType
): CreateVersionedContractInterfaceResult => ({
  [RenftContractType.AZRAEL]: createAzraelInterfaceVersionsThunk(contract),
  [RenftContractType.SYLVESTER]: createSylvesterInterfaceVersionsThunk(
    contract
  ),
  [RenftContractType.WHOOPI]: createWhoopiInterfaceVersionsThunk(
    contract,
    network
  ),
  [RenftContractType.RESOLVER]: createResolverInterfaceVersionsThunk(),
});
