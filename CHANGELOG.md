# Change Log

## [7.0.1] - 2023-06-09

## Changed

- Wording around contracts flavors in readme

## [7.0.0] - 2023-06-08

### Added

- `src/core` exporting types, configuration, and constants
- `src/ethers` exporting our `ethers` SDK interface `getRenftContract()`
- `src/viem` exporting our `viem` SDK interfaces `AzraelV0SDK`, `SylvesterV0SDK`, `SylvesterV1SDK`, `WhoopiV0SDK`
- `Deployment<RenftContractType, RenftContractVersion>` definition
- `test/ethers` containing most of previous test suite
- `test/viem` containing tests on `viem` SDK interfaces

### Changed

- Split up deployment configuration into separate files
- Updated `typescript` to `4.9.5`
- `src/abi` now exports ABIs as modules
- `RenftContractDeployment` renamed to `Deployments`

### Removed

- `ELLE` token support for Kryptoria integration
- `RenftContractDeployments`, use `Deployments[]`
- `CreateVersionedContractInterfaceResult`
- `Renft${Contract}Deployment`

## [6.0.0-alpha.11] - 2023-05-08

### Added

- `Chain` enum. Defines the supported chain IDs.
- `ALL_CHAINS` mapping. Maps chain IDs to their Network.

### Changed

- `Network` now uses `Chain` internally.

## [6.0.0-alpha.10] - 2023-05-04

### Added

Nothing.

### Changed

- Readme to instruct users what to do if the Readme example doesn't work. Plus some clarifications around what AZRAEL means.

## [6.0.0-alpha.9] - 2023-05-02

### Added

- Kryptoria's ELLE payment token.

### Changed

Nothing.

## [6.0.0-alpha.8] - 2023-05-01

### Added

- Goerli support for sylvester v0.
- This adds contract addresses for `Registry` and `Resolver`.

### Changed

Nothing.

## [6.0.0-alpha.7] - 2023-04-20

### Added

Nothing.

### Changed

- removed `zod` dependency => smaller bundle size
- `isValidDeployment()` will no longer warn of errors
- fix `@ethersproject/address` dependency to version `>=5.5.0` so all `@ethersproject` dependencies will be the same version

## [6.0.0-alpha.6] - 2023-04-19

### Added

- new `findSingleDeploymentOrThrow(serach)` method. Returns a single deployment or throws an error if there are multiple or none.
- new `isValidDeployment(deployment)` method. Returns true if the deployment is valid, false otherwise.

### Changed

- All reNFT deployment addresses are now in checksummed address format.
- Deprecated `RESOLVER_ADDRESS` in favor of `RESOLVER_ETHEREUM_ADDRESS`
- Deprecated `AZRAEL_ADDRESS` in favor of `AZRAEL_ETHEREUM_ADDRESS`
