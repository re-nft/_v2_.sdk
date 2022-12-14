'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var contracts = require('@ethersproject/contracts');
var isEqual = _interopDefault(require('react-fast-compare'));
var bignumber = require('@ethersproject/bignumber');

(function (EVMNetworkType) {
  EVMNetworkType["ETHEREUM_MAINNET"] = "ETHEREUM_MAINNET";
  EVMNetworkType["POLYGON_MAINNET"] = "POLYGON_MAINNET";
  EVMNetworkType["AVALANCHE_MAINNET"] = "AVALANCHE_MAINNET";
  EVMNetworkType["AVALANCHE_FUJI_TESTNET"] = "AVALANCHE_FUJI_TESTNET";
})(exports.EVMNetworkType || (exports.EVMNetworkType = {}));

(function (PaymentToken) {
  PaymentToken[PaymentToken["SENTINEL"] = 0] = "SENTINEL";
  PaymentToken[PaymentToken["WETH"] = 1] = "WETH";
  PaymentToken[PaymentToken["DAI"] = 2] = "DAI";
  PaymentToken[PaymentToken["USDC"] = 3] = "USDC";
  PaymentToken[PaymentToken["USDT"] = 4] = "USDT";
  PaymentToken[PaymentToken["TUSD"] = 5] = "TUSD";
  PaymentToken[PaymentToken["ACS"] = 7] = "ACS";
})(exports.PaymentToken || (exports.PaymentToken = {}));

(function (NFTStandard) {
  NFTStandard[NFTStandard["E721"] = 0] = "E721";
  NFTStandard[NFTStandard["E1155"] = 1] = "E1155";
})(exports.NFTStandard || (exports.NFTStandard = {})); // A RenftContractType represents a unique "style" of rental functionality:

(function (RenftContractType) {
  RenftContractType["AZRAEL"] = "AZRAEL";
  RenftContractType["SYLVESTER"] = "SYLVESTER";
  RenftContractType["WHOOPI"] = "WHOOPI";
  RenftContractType["RESOLVER"] = "RESOLVER";
})(exports.RenftContractType || (exports.RenftContractType = {}));

(function (AzraelVersion) {
  AzraelVersion["V0"] = "V0";
})(exports.AzraelVersion || (exports.AzraelVersion = {}));

(function (WhoopiVersion) {
  WhoopiVersion["V0"] = "V0";
})(exports.WhoopiVersion || (exports.WhoopiVersion = {}));

(function (SylvesterVersion) {
  SylvesterVersion["V0"] = "V0";
  SylvesterVersion["V1"] = "V1";
})(exports.SylvesterVersion || (exports.SylvesterVersion = {}));

(function (ResolverVersion) {
  ResolverVersion["V0"] = "V0";
  ResolverVersion["V1"] = "V1";
})(exports.ResolverVersion || (exports.ResolverVersion = {})); //// TODO: deprecate this
//export enum RenftContracts {
//  SYLVESTER = 0,
//  SYLVESTER_POLYGON = 1,
//  AZRAEL = 2,
//  WHOOPI_AVALANCHE = 3,
//  WHOOPI_FUJI = 4,
//}

var azrael_v0 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_resolver",
				type: "address"
			},
			{
				internalType: "address payable",
				name: "_beneficiary",
				type: "address"
			},
			{
				internalType: "address",
				name: "_admin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "claimedAt",
				type: "uint32"
			}
		],
		name: "CollateralClaimed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "stoppedAt",
				type: "uint32"
			}
		],
		name: "LendingStopped",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "lentAmount",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "lenderAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "maxRentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "bytes4",
				name: "dailyRentPrice",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "bytes4",
				name: "nftPrice",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isERC721",
				type: "bool"
			},
			{
				indexed: false,
				internalType: "enum IResolver.PaymentToken",
				name: "paymentToken",
				type: "uint8"
			}
		],
		name: "Lent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "renterAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "rentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "rentedAt",
				type: "uint32"
			}
		],
		name: "Rented",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "returnedAt",
				type: "uint32"
			}
		],
		name: "Returned",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_nfts",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "_tokenIds",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingIds",
				type: "uint256[]"
			}
		],
		name: "claimCollateral",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_nfts",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "_tokenIds",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendAmounts",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "_maxRentDurations",
				type: "uint8[]"
			},
			{
				internalType: "bytes4[]",
				name: "_dailyRentPrices",
				type: "bytes4[]"
			},
			{
				internalType: "bytes4[]",
				name: "_nftPrices",
				type: "bytes4[]"
			},
			{
				internalType: "enum IResolver.PaymentToken[]",
				name: "_paymentTokens",
				type: "uint8[]"
			}
		],
		name: "lend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155BatchReceived",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC721Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_nfts",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "_tokenIds",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingIds",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "_rentDurations",
				type: "uint8[]"
			}
		],
		name: "rent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "rentFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_nfts",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "_tokenIds",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingIds",
				type: "uint256[]"
			}
		],
		name: "returnIt",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "_newBeneficiary",
				type: "address"
			}
		],
		name: "setBeneficiary",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "_paused",
				type: "bool"
			}
		],
		name: "setPaused",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_rentFee",
				type: "uint256"
			}
		],
		name: "setRentFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_nfts",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "_tokenIds",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingIds",
				type: "uint256[]"
			}
		],
		name: "stopLending",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var sylvester_v0 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "newResolver",
				type: "address"
			},
			{
				internalType: "address payable",
				name: "newBeneficiary",
				type: "address"
			},
			{
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "is721",
				type: "bool"
			},
			{
				indexed: true,
				internalType: "address",
				name: "lenderAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "lendingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "maxRentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "bytes4",
				name: "dailyRentPrice",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "lendAmount",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "enum IResolver.PaymentToken",
				name: "paymentToken",
				type: "uint8"
			}
		],
		name: "Lend",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "renterAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingID",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "rentingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "rentAmount",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "rentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "rentedAt",
				type: "uint32"
			}
		],
		name: "Rent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "rentingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "collectedAt",
				type: "uint32"
			}
		],
		name: "RentClaimed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "stoppedAt",
				type: "uint32"
			}
		],
		name: "StopLend",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "rentingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "stoppedAt",
				type: "uint32"
			}
		],
		name: "StopRent",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_rentingID",
				type: "uint256[]"
			}
		],
		name: "claimRent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenID",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_lendingID",
				type: "uint256"
			}
		],
		name: "getLending",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			},
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			},
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenID",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_rentingID",
				type: "uint256"
			}
		],
		name: "getRenting",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			},
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			},
			{
				internalType: "uint32",
				name: "",
				type: "uint32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "lendAmount",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "maxRentDuration",
				type: "uint8[]"
			},
			{
				internalType: "bytes4[]",
				name: "dailyRentPrice",
				type: "bytes4[]"
			},
			{
				internalType: "enum IResolver.PaymentToken[]",
				name: "paymentToken",
				type: "uint8[]"
			}
		],
		name: "lend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155BatchReceived",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC721Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "rentDuration",
				type: "uint8[]"
			},
			{
				internalType: "uint256[]",
				name: "rentAmount",
				type: "uint256[]"
			}
		],
		name: "rent",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "rentFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "newBeneficiary",
				type: "address"
			}
		],
		name: "setBeneficiary",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "newPaused",
				type: "bool"
			}
		],
		name: "setPaused",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newRentFee",
				type: "uint256"
			}
		],
		name: "setRentFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			}
		],
		name: "stopLend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_rentingID",
				type: "uint256[]"
			}
		],
		name: "stopRent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var sylvester_v1 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "newResolver",
				type: "address"
			},
			{
				internalType: "address payable",
				name: "newBeneficiary",
				type: "address"
			},
			{
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "is721",
				type: "bool"
			},
			{
				indexed: true,
				internalType: "address",
				name: "lenderAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "lendingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "maxRentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "bytes4",
				name: "dailyRentPrice",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "lendAmount",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "enum IResolver.PaymentToken",
				name: "paymentToken",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "willAutoRenew",
				type: "bool"
			}
		],
		name: "Lend",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "renterAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingID",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "rentingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "rentAmount",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "rentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "rentedAt",
				type: "uint32"
			}
		],
		name: "Rent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "rentingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "collectedAt",
				type: "uint32"
			}
		],
		name: "RentClaimed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "stoppedAt",
				type: "uint32"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "amount",
				type: "uint16"
			}
		],
		name: "StopLend",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "rentingID",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint32",
				name: "stoppedAt",
				type: "uint32"
			}
		],
		name: "StopRent",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_rentingID",
				type: "uint256[]"
			}
		],
		name: "claimRent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenID",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_lendingID",
				type: "uint256"
			}
		],
		name: "getLending",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			},
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			},
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenID",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_rentingID",
				type: "uint256"
			}
		],
		name: "getRenting",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			},
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			},
			{
				internalType: "uint32",
				name: "",
				type: "uint32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "lendAmount",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "maxRentDuration",
				type: "uint8[]"
			},
			{
				internalType: "bytes4[]",
				name: "dailyRentPrice",
				type: "bytes4[]"
			},
			{
				internalType: "enum IResolver.PaymentToken[]",
				name: "paymentToken",
				type: "uint8[]"
			},
			{
				internalType: "bool[]",
				name: "willAutoRenew",
				type: "bool[]"
			}
		],
		name: "lend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155BatchReceived",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC721Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "rentDuration",
				type: "uint8[]"
			},
			{
				internalType: "uint256[]",
				name: "rentAmount",
				type: "uint256[]"
			}
		],
		name: "rent",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "rentFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "newBeneficiary",
				type: "address"
			}
		],
		name: "setBeneficiary",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "newPaused",
				type: "bool"
			}
		],
		name: "setPaused",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newRentFee",
				type: "uint256"
			}
		],
		name: "setRentFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			}
		],
		name: "stopLend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "enum IRegistry.NFTStandard[]",
				name: "nftStandard",
				type: "uint8[]"
			},
			{
				internalType: "address[]",
				name: "nftAddress",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "tokenID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_lendingID",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "_rentingID",
				type: "uint256[]"
			}
		],
		name: "stopRent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var whoopi_v0 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "newResolver",
				type: "address"
			},
			{
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "InvalidPortionsSum",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidProtocolFeeReceivers",
		type: "error"
	},
	{
		inputs: [
		],
		name: "LendingEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "LendingNotActive",
		type: "error"
	},
	{
		inputs: [
		],
		name: "LendingNotEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NftTransferFailed",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "NotAdmin",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "errorCode",
				type: "uint8"
			}
		],
		name: "NotLendable",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "errorCode",
				type: "uint8"
			}
		],
		name: "NotPayable",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "errorCode",
				type: "uint8"
			}
		],
		name: "NotRentable",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NotWhitelistedToRent",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Paused",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "rentDuration",
				type: "uint8"
			},
			{
				internalType: "uint8",
				name: "maxRentDuration",
				type: "uint8"
			}
		],
		name: "RentDurationExceedsMaxRentDuration",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RentingNotEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "ReturningNotAllowed",
		type: "error"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "lender",
				type: "address"
			},
			{
				internalType: "address",
				name: "msgSender",
				type: "address"
			}
		],
		name: "StopperNotLender",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "nftAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "upfrontRentFee",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address payable[]",
				name: "allowedRenters",
				type: "address[]"
			},
			{
				components: [
					{
						internalType: "address payable[]",
						name: "beneficiaries",
						type: "address[]"
					},
					{
						internalType: "uint8[]",
						name: "portions",
						type: "uint8[]"
					}
				],
				indexed: false,
				internalType: "struct IReNFT.RevShare",
				name: "revShares",
				type: "tuple"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "maxRentDuration",
				type: "uint8"
			},
			{
				indexed: false,
				internalType: "enum IResolver.PaymentToken",
				name: "paymentToken",
				type: "uint8"
			},
			{
				indexed: true,
				internalType: "address",
				name: "lenderAddress",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			}
		],
		name: "Lend",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "renterAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint8",
				name: "rentDuration",
				type: "uint8"
			}
		],
		name: "Rent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			}
		],
		name: "StopLend",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "lendingId",
				type: "uint256"
			}
		],
		name: "StopRent",
		type: "event"
	},
	{
		inputs: [
		],
		name: "flipPaused",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "contract INFTContract",
						name: "nft",
						type: "address"
					},
					{
						internalType: "uint256[]",
						name: "tokenIds",
						type: "uint256[]"
					},
					{
						internalType: "uint256[]",
						name: "lendingIds",
						type: "uint256[]"
					}
				],
				internalType: "struct IReNFT.Nfts",
				name: "nfts",
				type: "tuple"
			},
			{
				internalType: "uint256[]",
				name: "upfrontRentFee",
				type: "uint256[]"
			},
			{
				components: [
					{
						internalType: "address payable[]",
						name: "allowedRenters",
						type: "address[]"
					}
				],
				internalType: "struct IReNFT.AllowedRenters[]",
				name: "allowedRenters",
				type: "tuple[]"
			},
			{
				components: [
					{
						internalType: "address payable[]",
						name: "beneficiaries",
						type: "address[]"
					},
					{
						internalType: "uint8[]",
						name: "portions",
						type: "uint8[]"
					}
				],
				internalType: "struct IReNFT.RevShare[]",
				name: "revShares",
				type: "tuple[]"
			},
			{
				internalType: "uint8[]",
				name: "maxRentDurations",
				type: "uint8[]"
			},
			{
				internalType: "enum IResolver.PaymentToken[]",
				name: "paymentTokens",
				type: "uint8[]"
			}
		],
		name: "lend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "lendingRentings",
		outputs: [
			{
				components: [
					{
						internalType: "address payable[]",
						name: "allowedRenters",
						type: "address[]"
					},
					{
						components: [
							{
								internalType: "address payable[]",
								name: "beneficiaries",
								type: "address[]"
							},
							{
								internalType: "uint8[]",
								name: "portions",
								type: "uint8[]"
							}
						],
						internalType: "struct IReNFT.RevShare",
						name: "revShares",
						type: "tuple"
					},
					{
						internalType: "uint256",
						name: "upfrontRentFee",
						type: "uint256"
					},
					{
						internalType: "address payable",
						name: "lenderAddress",
						type: "address"
					},
					{
						internalType: "uint8",
						name: "maxRentDuration",
						type: "uint8"
					},
					{
						internalType: "enum IResolver.PaymentToken",
						name: "paymentToken",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "inactive",
						type: "bool"
					}
				],
				internalType: "struct IReNFT.Lending",
				name: "lending",
				type: "tuple"
			},
			{
				components: [
					{
						internalType: "address payable",
						name: "renterAddress",
						type: "address"
					},
					{
						internalType: "uint32",
						name: "rentedAt",
						type: "uint32"
					},
					{
						internalType: "uint8",
						name: "rentDuration",
						type: "uint8"
					}
				],
				internalType: "struct IReNFT.Renting",
				name: "renting",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155BatchReceived",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC1155Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		name: "onERC721Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "contract INFTContract",
						name: "nft",
						type: "address"
					},
					{
						internalType: "uint256[]",
						name: "tokenIds",
						type: "uint256[]"
					},
					{
						internalType: "uint256[]",
						name: "lendingIds",
						type: "uint256[]"
					}
				],
				internalType: "struct IReNFT.Nfts",
				name: "nfts",
				type: "tuple"
			},
			{
				internalType: "address payable[]",
				name: "renter",
				type: "address[]"
			},
			{
				internalType: "uint256[]",
				name: "amountToPay",
				type: "uint256[]"
			}
		],
		name: "pay",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "contract INFTContract",
						name: "nft",
						type: "address"
					},
					{
						internalType: "uint256[]",
						name: "tokenIds",
						type: "uint256[]"
					},
					{
						internalType: "uint256[]",
						name: "lendingIds",
						type: "uint256[]"
					}
				],
				internalType: "struct IReNFT.Nfts",
				name: "nfts",
				type: "tuple"
			},
			{
				internalType: "uint8[]",
				name: "rentDurations",
				type: "uint8[]"
			}
		],
		name: "rent",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "rentFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "revokeOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address payable[]",
				name: "newFeeReceivers",
				type: "address[]"
			},
			{
				internalType: "uint8[]",
				name: "newFeePortions",
				type: "uint8[]"
			}
		],
		name: "setProtocolFeeReceivers",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newRentFee",
				type: "uint256"
			}
		],
		name: "setRentFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "newRentStoppers",
				type: "address[]"
			}
		],
		name: "setRentStoppers",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "newRewardPayers",
				type: "address[]"
			}
		],
		name: "setRewardPayers",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "contract INFTContract",
						name: "nft",
						type: "address"
					},
					{
						internalType: "uint256[]",
						name: "tokenIds",
						type: "uint256[]"
					},
					{
						internalType: "uint256[]",
						name: "lendingIds",
						type: "uint256[]"
					}
				],
				internalType: "struct IReNFT.Nfts",
				name: "nfts",
				type: "tuple"
			}
		],
		name: "stopLend",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "contract INFTContract",
						name: "nft",
						type: "address"
					},
					{
						internalType: "uint256[]",
						name: "tokenIds",
						type: "uint256[]"
					},
					{
						internalType: "uint256[]",
						name: "lendingIds",
						type: "uint256[]"
					}
				],
				internalType: "struct IReNFT.Nfts",
				name: "nfts",
				type: "tuple"
			}
		],
		name: "stopRent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var resolver_v0 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_admin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_pt",
				type: "uint8"
			}
		],
		name: "getPaymentToken",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_pt",
				type: "uint8"
			},
			{
				internalType: "address",
				name: "_v",
				type: "address"
			}
		],
		name: "setPaymentToken",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var resolver_v1 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_admin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_pt",
				type: "uint8"
			}
		],
		name: "getPaymentToken",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_pt",
				type: "uint8"
			},
			{
				internalType: "address",
				name: "_v",
				type: "address"
			}
		],
		name: "setPaymentToken",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var _AZRAEL_ABI_VERSIONS, _SYLVESTER_ABI_VERSIO, _WHOOPI_ABI_VERSIONS, _RESOLVER_ABI_VERSION, _CONTRACT_ABI_VERSION, _ETHEREUM_MAINNET_PAY, _POLYGON_MAINNET_PAYM, _AVALANCHE_FUJI_TESTN, _AVALANCHE_MAINNET_PA, _NETWORK_RESOLVERS, _ALL_NETWORKS;
var NETWORK_ETHEREUM_MAINNET = {
  type: exports.EVMNetworkType.ETHEREUM_MAINNET,
  chainId: 1
};
var NETWORK_POLYGON_MAINNET = {
  type: exports.EVMNetworkType.POLYGON_MAINNET,
  chainId: 137
};
var NETWORK_AVALANCHE_FUJI_TESTNET = {
  type: exports.EVMNetworkType.AVALANCHE_FUJI_TESTNET,
  chainId: 43113
};
var NETWORK_AVALANCHE_MAINNET = {
  type: exports.EVMNetworkType.AVALANCHE_MAINNET,
  chainId: 43114
};
var AZRAEL_ABI_VERSIONS = (_AZRAEL_ABI_VERSIONS = {}, _AZRAEL_ABI_VERSIONS[exports.AzraelVersion.V0] = azrael_v0, _AZRAEL_ABI_VERSIONS);
var SYLVESTER_ABI_VERSIONS = (_SYLVESTER_ABI_VERSIO = {}, _SYLVESTER_ABI_VERSIO[exports.SylvesterVersion.V0] = sylvester_v0, _SYLVESTER_ABI_VERSIO[exports.SylvesterVersion.V1] = sylvester_v1, _SYLVESTER_ABI_VERSIO);
var WHOOPI_ABI_VERSIONS = (_WHOOPI_ABI_VERSIONS = {}, _WHOOPI_ABI_VERSIONS[exports.WhoopiVersion.V0] = whoopi_v0, _WHOOPI_ABI_VERSIONS);
var RESOLVER_ABI_VERSIONS = (_RESOLVER_ABI_VERSION = {}, _RESOLVER_ABI_VERSION[exports.ResolverVersion.V0] = resolver_v0, _RESOLVER_ABI_VERSION[exports.ResolverVersion.V1] = resolver_v1, _RESOLVER_ABI_VERSION);
var CONTRACT_ABI_VERSIONS = (_CONTRACT_ABI_VERSION = {}, _CONTRACT_ABI_VERSION[exports.RenftContractType.AZRAEL] = AZRAEL_ABI_VERSIONS, _CONTRACT_ABI_VERSION[exports.RenftContractType.SYLVESTER] = SYLVESTER_ABI_VERSIONS, _CONTRACT_ABI_VERSION[exports.RenftContractType.WHOOPI] = WHOOPI_ABI_VERSIONS, _CONTRACT_ABI_VERSION[exports.RenftContractType.RESOLVER] = RESOLVER_ABI_VERSIONS, _CONTRACT_ABI_VERSION); // TODO: enforce this relationship with ContractTypes
// * Note, this price does not apply to Whoopi

var MAX_PRICE = 9999.9999;
var NUM_BITS_IN_BYTE = 8; // Resolver related

var SENTINEL = {
  address: '',
  scale: 0
};
var ETHEREUM_WETH = {
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  scale: 18
};
var ETHEREUM_DAI = {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  scale: 18
};
var ETHEREUM_USDC = {
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  scale: 6
};
var ETHEREUM_USDT = {
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  scale: 6
};
var ETHEREUM_TUSD = {
  address: '0x0000000000085d4780B73119b644AE5ecd22b376',
  scale: 18
};
var POLYGON_WETH = {
  address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  scale: 18
};
var POLYGON_DAI = {
  address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  scale: 18
};
var POLYGON_USDC = {
  address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  scale: 6
};
var POLYGON_USDT = {
  address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  scale: 6
};
var POLYGON_TUSD = {
  address: '0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756',
  scale: 18
};
var FUJI_WETH = {
  address: '0x40E71a970Ff1fbd21A53b4d2dbc102Be0E1d574f',
  scale: 18
};
var FUJI_DAI = {
  address: '0x40E71a970Ff1fbd21A53b4d2dbc102Be0E1d574f',
  scale: 18
};
var FUJI_USDC = {
  address: '0x43CDA502069B1dFa4f7C1a1625Bc6be47cD0bD88',
  scale: 6
};
var FUJI_USDT = {
  address: '0x051DE28a8B5836f678A13d19EE7F8c167b4Ca54D',
  scale: 6
};
var FUJI_TUSD = {
  address: '0x051DE28a8B5836f678A13d19EE7F8c167b4Ca54D',
  scale: 6
};
var FUJI_ACS = {
  address: '0x4a590276DA8E8d660f8ef638464c2D1DF40cEAbA',
  scale: 18
};
var AVALANCHE_WETH = {
  address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  scale: 18
};
var AVALANCHE_DAI = {
  address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  scale: 18
};
var AVALANCHE_USDC = {
  address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  scale: 6
};
var AVALANCHE_USDT = {
  address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  scale: 6
};
var AVALANCHE_TUSD = {
  address: '0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB',
  scale: 18
};
var AVALANCHE_ACS = {
  address: '0x18fC6360E83FE91404d47Ea4400A221dfbBACF06',
  scale: 18
};
var ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS = (_ETHEREUM_MAINNET_PAY = {}, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.SENTINEL] = SENTINEL, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.WETH] = ETHEREUM_WETH, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.DAI] = ETHEREUM_DAI, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.USDC] = ETHEREUM_USDC, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.USDT] = ETHEREUM_USDT, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.TUSD] = ETHEREUM_TUSD, _ETHEREUM_MAINNET_PAY[exports.PaymentToken.ACS] = SENTINEL, _ETHEREUM_MAINNET_PAY);
var POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS = (_POLYGON_MAINNET_PAYM = {}, _POLYGON_MAINNET_PAYM[exports.PaymentToken.SENTINEL] = SENTINEL, _POLYGON_MAINNET_PAYM[exports.PaymentToken.WETH] = POLYGON_WETH, _POLYGON_MAINNET_PAYM[exports.PaymentToken.DAI] = POLYGON_DAI, _POLYGON_MAINNET_PAYM[exports.PaymentToken.USDC] = POLYGON_USDC, _POLYGON_MAINNET_PAYM[exports.PaymentToken.USDT] = POLYGON_USDT, _POLYGON_MAINNET_PAYM[exports.PaymentToken.TUSD] = POLYGON_TUSD, _POLYGON_MAINNET_PAYM[exports.PaymentToken.ACS] = SENTINEL, _POLYGON_MAINNET_PAYM);
var AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS = (_AVALANCHE_FUJI_TESTN = {}, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.SENTINEL] = SENTINEL, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.WETH] = FUJI_WETH, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.DAI] = FUJI_DAI, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.USDC] = FUJI_USDC, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.USDT] = FUJI_USDT, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.TUSD] = FUJI_TUSD, _AVALANCHE_FUJI_TESTN[exports.PaymentToken.ACS] = FUJI_ACS, _AVALANCHE_FUJI_TESTN);
var AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS = (_AVALANCHE_MAINNET_PA = {}, _AVALANCHE_MAINNET_PA[exports.PaymentToken.SENTINEL] = SENTINEL, _AVALANCHE_MAINNET_PA[exports.PaymentToken.WETH] = AVALANCHE_WETH, _AVALANCHE_MAINNET_PA[exports.PaymentToken.DAI] = AVALANCHE_DAI, _AVALANCHE_MAINNET_PA[exports.PaymentToken.USDC] = AVALANCHE_USDC, _AVALANCHE_MAINNET_PA[exports.PaymentToken.USDT] = AVALANCHE_USDT, _AVALANCHE_MAINNET_PA[exports.PaymentToken.TUSD] = AVALANCHE_TUSD, _AVALANCHE_MAINNET_PA[exports.PaymentToken.ACS] = AVALANCHE_ACS, _AVALANCHE_MAINNET_PA); // TODO: need to associate these with the resolver contract instance somehow

var NETWORK_RESOLVERS = (_NETWORK_RESOLVERS = {}, _NETWORK_RESOLVERS[exports.EVMNetworkType.ETHEREUM_MAINNET] = ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS, _NETWORK_RESOLVERS[exports.EVMNetworkType.POLYGON_MAINNET] = POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS, _NETWORK_RESOLVERS[exports.EVMNetworkType.AVALANCHE_FUJI_TESTNET] = AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS, _NETWORK_RESOLVERS[exports.EVMNetworkType.AVALANCHE_MAINNET] = AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS, _NETWORK_RESOLVERS);
var ALL_NETWORKS = (_ALL_NETWORKS = {}, _ALL_NETWORKS[exports.EVMNetworkType.ETHEREUM_MAINNET] = NETWORK_ETHEREUM_MAINNET, _ALL_NETWORKS[exports.EVMNetworkType.POLYGON_MAINNET] = NETWORK_POLYGON_MAINNET, _ALL_NETWORKS[exports.EVMNetworkType.AVALANCHE_FUJI_TESTNET] = NETWORK_AVALANCHE_FUJI_TESTNET, _ALL_NETWORKS[exports.EVMNetworkType.AVALANCHE_MAINNET] = NETWORK_AVALANCHE_MAINNET, _ALL_NETWORKS); //// @deprecated
//export const Resolvers: {
//  readonly [key in RenftContracts]: PaymentTokenResolvers;
//} = {
//  [RenftContracts.SYLVESTER]: NETWORK_RESOLVERS[EVMNetworkType.ETHEREUM_MAINNET],
//  [RenftContracts.SYLVESTER_POLYGON]: NETWORK_RESOLVERS[EVMNetworkType.POLYGON_MAINNET],
//  [RenftContracts.AZRAEL]: NETWORK_RESOLVERS[EVMNetworkType.ETHEREUM_MAINNET],
//  [RenftContracts.WHOOPI_AVALANCHE]: NETWORK_RESOLVERS[EVMNetworkType.AVALANCHE_MAINNET],
//  [RenftContracts.WHOOPI_FUJI]: NETWORK_RESOLVERS[EVMNetworkType.AVALANCHE_FUJI_TESTNET],
//};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var BITSIZE_MAX_VALUE = 32;
var HALF_BITSIZE = 16;
var PRICE_BITSIZE = 32;
/**
 * hexchar is 0 to 15 which is 2 ** 4 - 1.
 * This means that hexchar (aka nibble) is half a byte,
 * since byte is 8 bits. This function converts number
 * of bytes to number of nibbles.
 *
 * e.g. 2 bytes is 4 nibbles
 *
 * @param byteCount
 * @returns number of nibbles that represent the byteCount bytes
 */

var bytesToNibbles = function bytesToNibbles(byteCount) {
  if (typeof byteCount != 'number') throw new Error('only numbers supported');
  if (byteCount < 1) throw new Error('invalid byteCount');
  return byteCount * 2;
};
/**
 * (21.42, 32) -> 0x0015002A
 *
 * (1.2, 32)   -> 0x00010002
 *
 * Notice how the whole decimal part is reprsented by the first 4 nibbles,
 * whereas the decimal part is represented by the second part, i.e. the
 * last 4 nibbles
 *
 * @param number
 * @param bitsize
 * @returns number's padded (of bitsize total length) hex format
 */

var toPaddedHex = function toPaddedHex(number, bitsize) {
  // in node.js this function fails for bitsize above 32 bits
  if (bitsize > BITSIZE_MAX_VALUE) throw new Error("bitsize " + bitsize + " above maximum value " + BITSIZE_MAX_VALUE); // conversion to unsigned form based on

  if (number < 0) throw new Error('unsigned number not supported'); // 8 bits = 1 byteCount; 16 bits = 2 byteCount, ...

  var byteCount = Math.ceil(bitsize / NUM_BITS_IN_BYTE); // shifting 0 bits removes decimals
  // toString(16) converts into hex
  // .padStart(byteCount * 2, "0") adds byte

  return '0x' + (number >>> 0).toString(16).toUpperCase() // 1 nibble = 4 bits. 1 byte = 2 nibbles
  .padStart(bytesToNibbles(byteCount), '0');
};

var scaleDecimal = function scaleDecimal(num) {
  var numLen = num.length;
  var maxLen = 4;

  for (var i = 0; i < maxLen - numLen; i++) {
    num = num + '0';
  }

  return Number(num);
};
/**
 * Converts a number into the format that is acceptable by the ReNFT contract.
 * TLDR; to fit a single storage slot in the ReNFT contract, we split the whole
 * and decimal parts of a number to only have maximum 4 digits. That means, the
 * maximum price is 9999.9999. If more decimals are supplied, they are truncated.
 * If price exceeds the maximum whole part, this throws.
 * @param price value to pack
 * @returns price format that is acceptable by ReNFT contract
 */


var packPrice = function packPrice(price) {
  if (price > MAX_PRICE) throw new Error("supplied price exceeds " + MAX_PRICE);
  var parts = price.toString().split('.');
  var whole = Number(parts[0]);
  if (whole < 0) throw new Error("can't pack negative price");
  var wholeHex = toPaddedHex(Number(whole), HALF_BITSIZE);
  if (parts.length === 1) return wholeHex.concat('0000');
  if (parts.length !== 2) throw new Error('price packing issue');
  var decimal = scaleDecimal(parts[1].slice(0, 4));
  return wholeHex.concat(toPaddedHex(Number(decimal), HALF_BITSIZE).slice(2));
};

var sameLength = function sameLength(a, b) {
  return a.length === b.length;
};

var validateSameLength = function validateSameLength() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var prev = args[0];

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var curr = _args[_i];
    if (!curr) continue;
    if (!sameLength(prev, curr)) throw new Error('args length variable');
    prev = curr;
  }

  return true;
};

var decimalToPaddedHexString = function decimalToPaddedHexString(number, bitsize) {
  var byteCount = Math.ceil(bitsize / 8);
  var maxBinValue = Math.pow(2, bitsize) - 1;
  if (bitsize > 32) throw new Error('number above maximum value');
  if (number < 0) number = maxBinValue + number + 1;
  return '0x' + (number >>> 0).toString(16).toUpperCase().padStart(byteCount * 2, '0');
};
/**
 * To save as much gas as possible, we have decided to pack the rental
 * price tightly in the Lending struct in our contract. For this purpose,
 * we have decided to use 4 bytes to express the price. Leading two bytes
 * are used to signify the whole part of the price and the last two bytes
 * are used to signify the decimal part of the price. This function deals
 * with converting the packed price back to the human readable price.
 * @param price packed price to convert to human readable price
 */


var unpackPrice = function unpackPrice(price) {
  // price is from 1 to 4294967295. i.e. from 0x00000001 to 0xffffffff
  var numHex = decimalToPaddedHexString(Number(price), PRICE_BITSIZE).slice(2);
  var whole = parseInt(numHex.slice(0, 4), 16);
  var decimal = parseInt(numHex.slice(4), 16);
  if (whole > 9999) whole = 9999;
  if (decimal > 9999) decimal = 9999;
  var decimalStr = decimal.toString();
  var decimalLen = decimalStr.length;
  var maxLen = 4;

  for (var i = 0; i < maxLen - decimalLen; i++) {
    decimalStr = '0' + decimalStr;
  }

  return parseFloat(whole + "." + decimalStr);
};
/**
 * Our contracts take arrays of NFT addresses, their token ids, and other
 * relevant informatino for lending / renting. Contract assumes a specific
 * ordering for these. That is how we achieve minimal gas usage. This function
 * facilitates that ordering. In a nutshell, it puts all the ERC721s together,
 * followed by ERC1155s, which also sit next to each other in the sorted array.
 * This helps our contracts with calling the ERC1155's bundle transfer, and
 * that is yet another gas saving trick.
 *
 * To spend as little gas as possible, arguments must follow a particular format
 * when passed to the contract. This function prepares whatever inputs you want
 * to send, and returns the inputs in an optimal format.
 *
 * This algorithm's time complexity is pretty awful. But, it will never run on
 * large arrays, so it doesn't really matter.
 * @param args arguments that the client is intending to call the contracts
 * with.
 */

var prepareBatch = function prepareBatch(args) {
  if (args.nftAddress.length <= 1) return args;
  validateSameLength(args);
  var preparedBatch = {
    nftAddress: [],
    tokenID: []
  }; // input:  ['a', 'b', 'a', 'c']
  // output: [0, 2, 1, 3]

  var sortIndices = function sortIndices(nft) {
    var comp = function comp(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };

    var indices = new Array(nft.length).fill(0).map(function (_, i) {
      return i;
    });
    return indices.sort(function (a, b) {
      return comp(nft[a], nft[b]);
    });
  };

  var sortWithIndices = function sortWithIndices(items, indices) {
    return indices.map(function (i) {
      return items[i];
    });
  };

  var indices = sortIndices(args.nftAddress);
  Object.keys(args).forEach(function (key) {
    //@ts-ignore
    preparedBatch[key] = sortWithIndices(args[key], indices);
  });
  return preparedBatch;
}; // TODO: deprecate the usage of these in front & api. People should use
// parseFixed directly.
// TODO: haven't tested the Bytes conversion here. Do **NOT** use with Bytes

var toWhoopiScaledAmount = function toWhoopiScaledAmount(v, c, t) {
  if (t === exports.PaymentToken.SENTINEL) throw new TypeError('Invalid payment token. Non-sentinels supported only.');
  var resolver = NETWORK_RESOLVERS[c];
  return bignumber.parseFixed(String(v), resolver[t].scale);
}; // TODO: deprecate the usage of these in front & api. People should use
// formatFixed directly.
// TODO: haven't tested the Bytes conversion here. Do **NOT** use with Bytes

var fromWhoopiScaledAmount = function fromWhoopiScaledAmount(v, c, t) {
  if (t === exports.PaymentToken.SENTINEL) throw new TypeError('Invalid payment token. Non-sentinels supported only.');
  var resolver = NETWORK_RESOLVERS[c];
  return bignumber.formatFixed(v, resolver[t].scale);
};

var createAzraelV0LendThunk = function createAzraelV0LendThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(nftAddress, tokenID, amount, maxRentDuration, dailyRentPrice, nftPrice, paymentToken, options) {
      var args;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = prepareBatch({
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                amount: amount.map(Number),
                maxRentDuration: maxRentDuration.map(Number),
                dailyRentPrice: dailyRentPrice.map(function (x) {
                  return packPrice(Number(x).toString());
                }),
                nftPrice: nftPrice.map(function (x) {
                  return packPrice(Number(x).toString());
                }),
                paymentToken: paymentToken
              });
              _context.next = 3;
              return contract.lend(args.nftAddress, args.tokenID, args.amount, args.maxRentDuration, args.dailyRentPrice, args.nftPrice, args.paymentToken, options != null ? options : []);

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }();
};
var createAzraelV0RentThunk = function createAzraelV0RentThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(nftAddress, tokenID, lendingID, rentDuration, options) {
      var args;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = prepareBatch({
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String),
                rentDuration: rentDuration.map(Number)
              });
              _context2.next = 3;
              return contract.rent(args.nftAddress, args.tokenID, args.lendingID, args.rentDuration, options != null ? options : []);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x9, _x10, _x11, _x12, _x13) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var createAzraelV0ReturnItThunk = function createAzraelV0ReturnItThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(nftAddress, tokenID, lendingID, options) {
      var args;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = prepareBatch({
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String)
              });
              _context3.next = 3;
              return contract.returnIt(args.nftAddress, args.tokenID, args.lendingID, options != null ? options : []);

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x14, _x15, _x16, _x17) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var createAzraelV0ClaimCollateralThunk = function createAzraelV0ClaimCollateralThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(nftAddress, tokenID, lendingID, options) {
      var args;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              args = prepareBatch({
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String)
              });
              _context4.next = 3;
              return contract.claimCollateral(args.nftAddress, args.tokenID, args.lendingID, options != null ? options : []);

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x18, _x19, _x20, _x21) {
      return _ref4.apply(this, arguments);
    };
  }();
};
var createAzraelV0StopLendingThunk = function createAzraelV0StopLendingThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(nftAddress, tokenID, lendingID, options) {
      var args;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              args = prepareBatch({
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String)
              });
              _context5.next = 3;
              return contract.stopLending(args.nftAddress, args.tokenID, args.lendingID, options != null ? options : []);

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x22, _x23, _x24, _x25) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var createSylvesterV0LendThunk = function createSylvesterV0LendThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(nftStandard, nftAddress, tokenID, amount, maxRentDuration, dailyRentPrice, paymentToken, options) {
      var args;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = prepareBatch({
                nftStandard: nftStandard,
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                amount: amount.map(Number),
                maxRentDuration: maxRentDuration.map(Number),
                dailyRentPrice: dailyRentPrice.map(function (x) {
                  return packPrice(Number(x).toString());
                }),
                paymentToken: paymentToken
              });
              _context.next = 3;
              return contract.lend(args.nftStandard, args.nftAddress, args.tokenID, args.amount, args.maxRentDuration, args.dailyRentPrice, args.paymentToken, options != null ? options : []);

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }();
};
var createSylvesterV1LendThunk = function createSylvesterV1LendThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(nftStandard, nftAddress, tokenID, amount, maxRentDuration, dailyRentPrice, paymentToken, willAutoRenew, options) {
      var args;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = prepareBatch({
                nftStandard: nftStandard,
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                amount: amount.map(Number),
                maxRentDuration: maxRentDuration.map(Number),
                dailyRentPrice: dailyRentPrice.map(function (x) {
                  return packPrice(Number(x).toString());
                }),
                paymentToken: paymentToken,
                willAutoRenew: willAutoRenew.map(function (x) {
                  return x ? 1 : 0;
                })
              });
              _context2.next = 3;
              return contract.lend(args.nftStandard, args.nftAddress, args.tokenID, args.amount, args.maxRentDuration, args.dailyRentPrice, args.paymentToken, args.willAutoRenew, options != null ? options : []);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var createSylvesterV0RentThunk = function createSylvesterV0RentThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(nftStandard, nftAddress, tokenID, lendingID, rentDuration, rentAmount, options) {
      var args;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = prepareBatch({
                nftStandard: nftStandard.map(Number),
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String),
                rentDuration: rentDuration.map(Number),
                rentAmount: rentAmount.map(String)
              });
              _context3.next = 3;
              return contract.rent(args.nftStandard, args.nftAddress, args.tokenID, args.lendingID, args.rentDuration, args.rentAmount, options != null ? options : []);

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x18, _x19, _x20, _x21, _x22, _x23, _x24) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var createSylvesterV0ReturnItThunk = function createSylvesterV0ReturnItThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(nftStandard, nftAddress, tokenID, lendingID, rentingID, options) {
      var args;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              args = prepareBatch({
                nftStandard: nftStandard.map(Number),
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String),
                rentingID: rentingID.map(String)
              });
              _context4.next = 3;
              return contract.stopRent(args.nftStandard, args.nftAddress, args.tokenID, args.lendingID, args.rentingID, options != null ? options : []);

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x25, _x26, _x27, _x28, _x29, _x30) {
      return _ref4.apply(this, arguments);
    };
  }();
};
var createSylvesterV0ClaimCollateralThunk = function createSylvesterV0ClaimCollateralThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(nftStandard, nftAddress, tokenID, lendingID, rentingID, options) {
      var args;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              args = prepareBatch({
                nftStandard: nftStandard.map(Number),
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String),
                rentingID: rentingID.map(String)
              });
              _context5.next = 3;
              return contract.claimRent(args.nftStandard, args.nftAddress, args.tokenID, args.lendingID, args.rentingID, options != null ? options : []);

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x31, _x32, _x33, _x34, _x35, _x36) {
      return _ref5.apply(this, arguments);
    };
  }();
};
var createSylvesterV0StopLendingThunk = function createSylvesterV0StopLendingThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(nftStandard, nftAddress, tokenID, lendingID, options) {
      var args;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              args = prepareBatch({
                nftStandard: nftStandard.map(Number),
                nftAddress: nftAddress.map(String),
                tokenID: tokenID.map(String),
                lendingID: lendingID.map(String)
              });
              _context6.next = 3;
              return contract.stopLend(args.nftStandard, args.nftAddress, args.tokenID, args.lendingID, options != null ? options : []);

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x37, _x38, _x39, _x40, _x41) {
      return _ref6.apply(this, arguments);
    };
  }();
};

var createWhoopiV0LendThunk = function createWhoopiV0LendThunk(contract, network) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(nftAddress, tokenId, upfrontRentFees, revShareBeneficiaries, revSharePortions, maxRentDurations, paymentTokens, allowedRenters, options) {
      var _upfrontRentFees$map;

      var revShares, i, allowRenters, _i, _i2;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              revShares = [];

              for (i = 0; i < revShareBeneficiaries.length; i++) {
                revShares.push([revShareBeneficiaries[i], revSharePortions[i]]);
              }

              allowRenters = [];

              if (allowedRenters) {
                for (_i = 0; _i < allowedRenters.length; _i++) {
                  allowRenters.push([allowedRenters[_i]]);
                }
              } else {
                for (_i2 = 0; _i2 < tokenId.length; _i2++) {
                  // outer array is for the AllowedRenters struct,
                  // and the inner is for its contents: allowedRenters
                  // ! we need this layering because graphprotocol cannot
                  // ! generate types for 2d arrays. So you have to wrap
                  // ! the outer array into a struct.
                  allowRenters.push([[]]);
                }
              }

              _context.next = 6;
              return contract.lend([nftAddress, tokenId, Array(tokenId.length).fill('0')], (_upfrontRentFees$map = upfrontRentFees.map(function (x, i) {
                return toWhoopiScaledAmount(x, network, paymentTokens[i]);
              })) != null ? _upfrontRentFees$map : [], allowRenters, revShares, maxRentDurations, paymentTokens, options != null ? options : []);

            case 6:
              return _context.abrupt("return", _context.sent);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
      return _ref.apply(this, arguments);
    };
  }();
};
var createWhoopiV0RentThunk = function createWhoopiV0RentThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(nftAddress, tokenId, lendingId, rentDurations, options) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return contract.rent([nftAddress, tokenId, lendingId], rentDurations, options != null ? options : []);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x10, _x11, _x12, _x13, _x14) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var createWhoopiV0StopRentThunk = function createWhoopiV0StopRentThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(nftAddress, tokenId, lendingId, options) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return contract.stopRent(nftAddress, tokenId, lendingId, options != null ? options : []);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x15, _x16, _x17, _x18) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var createWhoopiV0StopLendingThunk = function createWhoopiV0StopLendingThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(nftAddress, tokenId, lendingId, options) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return contract.stopLend([nftAddress, tokenId, lendingId], options != null ? options : []);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x19, _x20, _x21, _x22) {
      return _ref4.apply(this, arguments);
    };
  }();
};
var createWhoopiV0PayThunk = function createWhoopiV0PayThunk(contract) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(nftAddress, tokenId, lendingId, renterAddress, amountToPay, options) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return contract.pay([nftAddress, tokenId, lendingId], renterAddress, amountToPay, options != null ? options : []);

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x23, _x24, _x25, _x26, _x27, _x28) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var createAzraelInterfaceVersionsThunk = function createAzraelInterfaceVersionsThunk(contract) {
  var _ref;

  return _ref = {}, _ref[exports.AzraelVersion.V0] = {
    lend: createAzraelV0LendThunk(contract),
    rent: createAzraelV0RentThunk(contract),
    returnIt: createAzraelV0ReturnItThunk(contract),
    claimCollateral: createAzraelV0ClaimCollateralThunk(contract),
    stopLending: createAzraelV0StopLendingThunk(contract)
  }, _ref;
};

var createSylvesterInterfaceVersionsThunk = function createSylvesterInterfaceVersionsThunk(contract) {
  var _ref2;

  return _ref2 = {}, _ref2[exports.SylvesterVersion.V0] = {
    lend: createSylvesterV0LendThunk(contract),
    rent: createSylvesterV0RentThunk(contract),
    returnIt: createSylvesterV0ReturnItThunk(contract),
    claimCollateral: createSylvesterV0ClaimCollateralThunk(contract),
    stopLending: createSylvesterV0StopLendingThunk(contract)
  }, _ref2[exports.SylvesterVersion.V1] = {
    lend: createSylvesterV1LendThunk(contract),
    rent: createSylvesterV0RentThunk(contract),
    returnIt: createSylvesterV0ReturnItThunk(contract),
    claimCollateral: createSylvesterV0ClaimCollateralThunk(contract),
    stopLending: createSylvesterV0StopLendingThunk(contract)
  }, _ref2;
};

var createWhoopiInterfaceVersionsThunk = function createWhoopiInterfaceVersionsThunk(contract, network) {
  var _ref3;

  return _ref3 = {}, _ref3[exports.WhoopiVersion.V0] = {
    lend: createWhoopiV0LendThunk(contract, network),
    rent: createWhoopiV0RentThunk(contract),
    stopRent: createWhoopiV0StopRentThunk(contract),
    stopLending: createWhoopiV0StopLendingThunk(contract),
    pay: createWhoopiV0PayThunk(contract)
  }, _ref3;
};

var createResolverInterfaceVersionsThunk = function createResolverInterfaceVersionsThunk() {
  var _ref4;

  return _ref4 = {}, _ref4[exports.ResolverVersion.V0] = {}, _ref4[exports.ResolverVersion.V1] = {}, _ref4;
};

var createInterfaceVersions = function createInterfaceVersions(contract, network) {
  var _ref5;

  return _ref5 = {}, _ref5[exports.RenftContractType.AZRAEL] = createAzraelInterfaceVersionsThunk(contract), _ref5[exports.RenftContractType.SYLVESTER] = createSylvesterInterfaceVersionsThunk(contract), _ref5[exports.RenftContractType.WHOOPI] = createWhoopiInterfaceVersionsThunk(contract, network), _ref5[exports.RenftContractType.RESOLVER] = createResolverInterfaceVersionsThunk(), _ref5;
};

var DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x94d8f036a0fbc216bb532d33bdf6564157af0cd7',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: exports.RenftContractType.AZRAEL,
  version: exports.AzraelVersion.V0
};
var DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0xa8D3F65b6E2922fED1430b77aC2b557e1fa8DA4a',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: exports.RenftContractType.SYLVESTER,
  version: exports.SylvesterVersion.V0
};
var DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0 = {
  contractAddress: '0xfA06cFE34C85Ec6b6D29A6a99806cC68BA0018Fe',
  network: NETWORK_POLYGON_MAINNET,
  contractType: exports.RenftContractType.SYLVESTER,
  version: exports.SylvesterVersion.V0
};
var DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1 = {
  contractAddress: '0x4e52b73aa28b7ff84d88ea3a90c0668f46043450',
  network: NETWORK_POLYGON_MAINNET,
  contractType: exports.RenftContractType.SYLVESTER,
  version: exports.SylvesterVersion.V1
};
var DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x42816FA3cB0aDc3fcAdED3109323c0Bc19215084',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: exports.RenftContractType.WHOOPI,
  version: exports.WhoopiVersion.V0
};
var DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0x6Ee495ecEd3A0255057667FF2685e53f54A19A65',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: exports.RenftContractType.WHOOPI,
  version: exports.WhoopiVersion.V0
};
var DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0 = {
  contractAddress: '0x945e589a4715d1915e6fe14f08e4887bc4019341',
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: exports.RenftContractType.RESOLVER,
  version: exports.ResolverVersion.V0
};
var DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0 = {
  contractAddress: '0x6884d88Ce56C5C93F46eE23684eBA8628c90B518',
  network: NETWORK_POLYGON_MAINNET,
  contractType: exports.RenftContractType.RESOLVER,
  version: exports.ResolverVersion.V0
};
var DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1 = {
  contractAddress: '0x3ddc85bb768a11b0125f4ee71cfea54e54653366',
  network: NETWORK_POLYGON_MAINNET,
  contractType: exports.RenftContractType.RESOLVER,
  version: exports.ResolverVersion.V1
};
var DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0 = {
  contractAddress: '0x23F7F8B03BAF01D5124255fE240E81BbBd3AEc0D',
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: exports.RenftContractType.RESOLVER,
  version: exports.ResolverVersion.V0
};
var DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0 = {
  contractAddress: '0xEBFd584AAC21dfEFF02c3d4f308B0962610a028A',
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: exports.RenftContractType.RESOLVER,
  version: exports.ResolverVersion.V0
};
var RENFT_CONTRACT_DEPLOYMENTS = [DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0, DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0, DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0, DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0, DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0, DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0, DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0, DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0, DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0, DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1];
function findDeployments(search) {
  return RENFT_CONTRACT_DEPLOYMENTS.filter(function (maybeMatchingDeployment) {
    var definedKeys = Object.keys(search);
    var filterObject = Object.fromEntries(Object.entries(maybeMatchingDeployment).filter(function (_ref) {
      var k = _ref[0];
      return definedKeys.includes(k);
    }));
    return isEqual(filterObject, search);
  });
} // Find a single contract address for a given deployment. Will throw if none-or-many
// matching deployments are found.

function getContractAddressForDeployment(search) {
  var matchingDeployments = findDeployments(search);
  if (!matchingDeployments.length) throw new Error("[getContractAddressForDeployment]: Failed to find a matching deployment for search: " + JSON.stringify(search));
  if (matchingDeployments.length > 1) throw new Error("[getContractAddressForDeployment]: Found multiple possible deployments for search: " + JSON.stringify(search));
  var matchingDeployment = matchingDeployments[0];
  var contractAddress = matchingDeployment.contractAddress;
  return contractAddress;
}
function getDeploymentAbi(_ref2) {
  var contractType = _ref2.contractType,
      version = _ref2.version;
  var contractAbiVersions = CONTRACT_ABI_VERSIONS[contractType]; // @ts-expect-error versioning isn't deterministic at this point because we haven't strictly typed AbiVersions with InterfaceVersions.

  var maybeContractAbi = contractAbiVersions[version];
  if (!maybeContractAbi) throw new Error("[getDeploymentAbi]: Unable to find abi for combination \"" + String(contractType) + "\", \"" + String(version) + "\".");
  return maybeContractAbi;
}
function getContractForDeployment(_ref3) {
  var contractAddress = _ref3.contractAddress,
      contractType = _ref3.contractType,
      version = _ref3.version,
      signer = _ref3.signer;
  var abi = getDeploymentAbi({
    contractType: contractType,
    version: version
  });
  return new contracts.Contract(contractAddress, abi, signer != null ? signer : undefined);
}
function getRenftContract(_ref4) {
  var deployment = _ref4.deployment,
      signer = _ref4.signer;
  var contractAddress = deployment.contractAddress,
      contractType = deployment.contractType,
      version = deployment.version,
      networkType = deployment.network.type;
  var contract = getContractForDeployment({
    contractAddress: contractAddress,
    contractType: contractType,
    version: version,
    signer: signer
  });

  var _createInterfaceVersi = createInterfaceVersions(contract, networkType),
      contractFunctions = _createInterfaceVersi[contractType];

  return contractFunctions[version];
}

var RESOLVER_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: exports.RenftContractType.RESOLVER
});
var RESOLVER_POLYGON_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_POLYGON_MAINNET,
  contractType: exports.RenftContractType.RESOLVER,
  version: exports.ResolverVersion.V0
});
var RESOLVER_FUJI_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: exports.RenftContractType.RESOLVER
});
var RESOLVER_AVALANCHE_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: exports.RenftContractType.RESOLVER
});
var AZRAEL_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: exports.RenftContractType.AZRAEL
});
var SYLVESTER_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_ETHEREUM_MAINNET,
  contractType: exports.RenftContractType.SYLVESTER
});
var SYLVESTER_POLYGON_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_POLYGON_MAINNET,
  contractType: exports.RenftContractType.SYLVESTER
});
var WHOOPI_FUJI_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_FUJI_TESTNET,
  contractType: exports.RenftContractType.WHOOPI
});
var WHOOPI_AVALANCHE_ADDRESS = /*#__PURE__*/getContractAddressForDeployment({
  network: NETWORK_AVALANCHE_MAINNET,
  contractType: exports.RenftContractType.WHOOPI
});

exports.ALL_NETWORKS = ALL_NETWORKS;
exports.AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS = AVALANCHE_FUJI_TESTNET_PAYMENT_TOKEN_RESOLVERS;
exports.AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS = AVALANCHE_MAINNET_PAYMENT_TOKEN_RESOLVERS;
exports.AZRAEL_ABI_VERSIONS = AZRAEL_ABI_VERSIONS;
exports.AZRAEL_ADDRESS = AZRAEL_ADDRESS;
exports.CONTRACT_ABI_VERSIONS = CONTRACT_ABI_VERSIONS;
exports.DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0 = DEPLOYMENT_AZRAEL_ETHEREUM_MAINNET_V0;
exports.DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0 = DEPLOYMENT_RESOLVER_AVALANCHE_FUJI_TESTNET_V0;
exports.DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0 = DEPLOYMENT_RESOLVER_AVALANCHE_MAINNET_V0;
exports.DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0 = DEPLOYMENT_RESOLVER_ETHEREUM_MAINNET_V0;
exports.DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0 = DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V0;
exports.DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1 = DEPLOYMENT_RESOLVER_POLYGON_MAINNET_V1;
exports.DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0 = DEPLOYMENT_SYLVESTER_ETHEREUM_MAINNET_V0;
exports.DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0 = DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V0;
exports.DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1 = DEPLOYMENT_SYLVESTER_POLYGON_MAINNET_V1;
exports.DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0 = DEPLOYMENT_WHOOPI_AVALANCHE_FUJI_TESTNET_V0;
exports.DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0 = DEPLOYMENT_WHOOPI_AVALANCHE_MAINNET_V0;
exports.ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS = ETHEREUM_MAINNET_PAYMENT_TOKEN_RESOLVERS;
exports.MAX_PRICE = MAX_PRICE;
exports.NETWORK_AVALANCHE_FUJI_TESTNET = NETWORK_AVALANCHE_FUJI_TESTNET;
exports.NETWORK_AVALANCHE_MAINNET = NETWORK_AVALANCHE_MAINNET;
exports.NETWORK_ETHEREUM_MAINNET = NETWORK_ETHEREUM_MAINNET;
exports.NETWORK_POLYGON_MAINNET = NETWORK_POLYGON_MAINNET;
exports.NETWORK_RESOLVERS = NETWORK_RESOLVERS;
exports.NUM_BITS_IN_BYTE = NUM_BITS_IN_BYTE;
exports.POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS = POLYGON_MAINNET_PAYMENT_TOKEN_RESOLVERS;
exports.RENFT_CONTRACT_DEPLOYMENTS = RENFT_CONTRACT_DEPLOYMENTS;
exports.RESOLVER_ABI_VERSIONS = RESOLVER_ABI_VERSIONS;
exports.RESOLVER_ADDRESS = RESOLVER_ADDRESS;
exports.RESOLVER_AVALANCHE_ADDRESS = RESOLVER_AVALANCHE_ADDRESS;
exports.RESOLVER_FUJI_ADDRESS = RESOLVER_FUJI_ADDRESS;
exports.RESOLVER_POLYGON_ADDRESS = RESOLVER_POLYGON_ADDRESS;
exports.SYLVESTER_ABI_VERSIONS = SYLVESTER_ABI_VERSIONS;
exports.SYLVESTER_ADDRESS = SYLVESTER_ADDRESS;
exports.SYLVESTER_POLYGON_ADDRESS = SYLVESTER_POLYGON_ADDRESS;
exports.WHOOPI_ABI_VERSIONS = WHOOPI_ABI_VERSIONS;
exports.WHOOPI_AVALANCHE_ADDRESS = WHOOPI_AVALANCHE_ADDRESS;
exports.WHOOPI_FUJI_ADDRESS = WHOOPI_FUJI_ADDRESS;
exports.bytesToNibbles = bytesToNibbles;
exports.createAzraelV0ClaimCollateralThunk = createAzraelV0ClaimCollateralThunk;
exports.createAzraelV0LendThunk = createAzraelV0LendThunk;
exports.createAzraelV0RentThunk = createAzraelV0RentThunk;
exports.createAzraelV0ReturnItThunk = createAzraelV0ReturnItThunk;
exports.createAzraelV0StopLendingThunk = createAzraelV0StopLendingThunk;
exports.createInterfaceVersions = createInterfaceVersions;
exports.createSylvesterV0ClaimCollateralThunk = createSylvesterV0ClaimCollateralThunk;
exports.createSylvesterV0LendThunk = createSylvesterV0LendThunk;
exports.createSylvesterV0RentThunk = createSylvesterV0RentThunk;
exports.createSylvesterV0ReturnItThunk = createSylvesterV0ReturnItThunk;
exports.createSylvesterV0StopLendingThunk = createSylvesterV0StopLendingThunk;
exports.createSylvesterV1LendThunk = createSylvesterV1LendThunk;
exports.createWhoopiV0LendThunk = createWhoopiV0LendThunk;
exports.createWhoopiV0PayThunk = createWhoopiV0PayThunk;
exports.createWhoopiV0RentThunk = createWhoopiV0RentThunk;
exports.createWhoopiV0StopLendingThunk = createWhoopiV0StopLendingThunk;
exports.createWhoopiV0StopRentThunk = createWhoopiV0StopRentThunk;
exports.findDeployments = findDeployments;
exports.fromWhoopiScaledAmount = fromWhoopiScaledAmount;
exports.getContractAddressForDeployment = getContractAddressForDeployment;
exports.getContractForDeployment = getContractForDeployment;
exports.getDeploymentAbi = getDeploymentAbi;
exports.getRenftContract = getRenftContract;
exports.packPrice = packPrice;
exports.prepareBatch = prepareBatch;
exports.toPaddedHex = toPaddedHex;
exports.toWhoopiScaledAmount = toWhoopiScaledAmount;
exports.unpackPrice = unpackPrice;
//# sourceMappingURL=sdk.cjs.development.js.map
