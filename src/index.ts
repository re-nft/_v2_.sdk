import ResolverAbi from './abi/resolver.abi';
import SylvesterAbi from './abi/sylvester.abi';
import AzraelAbi from './abi/azrael.abi';
import WhoopiAbi from './abi/whoopi.abi';

import {AzraelV0FunctionInterface as IAzrael} from './contracts2/azrael/types';
import {SylvesterV0FunctionInterface as ISylvester} from './contracts2/sylvester/types';
import {WhoopiV0FunctionInterface as IWhoopi} from './contracts2/whoopi/types';

// @deprecated
export { Sylvester } from './contracts/sylvester';
export { Azrael } from './contracts/azrael';
export { Whoopi } from './contracts/whoopi';

export {
  ResolverAddress as RESOLVER_ADDRESS,
  AzraelAddress as AZRAEL_ADDRESS,
  SylvesterAddress as SYLVESTER_ADDRESS,
  ResolverPolygonAddress as RESOLVER_POLYGON_ADDRESS,
  SylvesterPolygonAddress as SYLVESTER_POLYGON_ADDRESS,
  ResolverAvalancheAddress as RESOLVER_AVALANCHE_ADDRESS,
  WhoopiAvalancheAddress as WHOOPI_AVALANCHE_ADDRESS,
  WhoopiFujiAddress as WHOOPI_FUJI_ADDRESS,
  ResolverFujiAddress as RESOLVER_FUJI_ADDRESS,
  Resolvers as RESOLVERS,
} from './consts';

export { PaymentToken, NFTStandard, RenftContracts } from './types';
export {
  packPrice,
  unpackPrice,
  toPaddedHex,
  prepareBatch,
  toScaledAmount,
  fromScaledAmount,
} from './utils';

export {
  ResolverAbi as RESOLVER_ABI,
  SylvesterAbi as SYLVESTER_ABI,
  AzraelAbi as AZRAEL_ABI,
  WhoopiAbi as WHOOPI_ABI,
  IAzrael,
  ISylvester,
  IWhoopi,
};
