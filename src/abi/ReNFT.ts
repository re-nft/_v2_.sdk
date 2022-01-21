export const ReNFT = {
  abi: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newResolver",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "newBeneficiary",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "InvalidAmountToLend",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "LendingEmpty",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "LendingNotEmpty",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NoNfts",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "caller",
          "type": "address"
        }
      ],
      "name": "NotAdmin",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotAllowedToEdit",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotLendable",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nowTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rentedAtTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rentDuration",
          "type": "uint256"
        }
      ],
      "name": "NotPastReturnDate",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotRentable",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nowTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rentedAtTimestamp",
          "type": "uint256"
        }
      ],
      "name": "NowBeforeRentedAt",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nowTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "rentedAt",
          "type": "uint32"
        },
        {
          "internalType": "uint8",
          "name": "rentDuration",
          "type": "uint8"
        }
      ],
      "name": "PastReturnDate",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Paused",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "rentDuration",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "maxRentDuration",
          "type": "uint8"
        }
      ],
      "name": "RentDurationExceedsMaxRentDuration",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RentingEmpty",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RentingNotEmpty",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "renter",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "msgSender",
          "type": "address"
        }
      ],
      "name": "ReturnerNotRenterNotAllowed",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "lender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "msgSender",
          "type": "address"
        }
      ],
      "name": "StopperNotLender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "lendingId",
          "type": "uint256"
        }
      ],
      "name": "CollateralClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "lendingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "maxRentDuration",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dailyRentPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "collateral",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum IResolver.PaymentToken",
          "name": "paymentToken",
          "type": "uint8"
        }
      ],
      "name": "LendingEdited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "lendingId",
          "type": "uint256"
        }
      ],
      "name": "LendingStopped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "nftAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "lentAmount",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "lendingId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "lenderAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "maxRentDuration",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dailyRentPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "collateral",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum IResolver.PaymentToken",
          "name": "paymentToken",
          "type": "uint8"
        }
      ],
      "name": "Lent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "lendingId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "renterAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rentDuration",
          "type": "uint8"
        }
      ],
      "name": "Rented",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "lendingId",
          "type": "uint256"
        }
      ],
      "name": "Returned",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract INFTContract[]",
              "name": "nft",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "lendingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct IReNFT.Nfts",
          "name": "nfts",
          "type": "tuple"
        }
      ],
      "name": "claimCollateral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract INFTContract[]",
              "name": "nft",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "lendingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct IReNFT.Nfts",
          "name": "nfts",
          "type": "tuple"
        },
        {
          "internalType": "uint8[]",
          "name": "maxRentDurations",
          "type": "uint8[]"
        },
        {
          "components": [
            {
              "internalType": "uint24",
              "name": "whole",
              "type": "uint24"
            },
            {
              "internalType": "uint8",
              "name": "decimal",
              "type": "uint8"
            }
          ],
          "internalType": "struct IReNFT.Price[]",
          "name": "dailyRentPrices",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "uint24",
              "name": "whole",
              "type": "uint24"
            },
            {
              "internalType": "uint8",
              "name": "decimal",
              "type": "uint8"
            }
          ],
          "internalType": "struct IReNFT.Price[]",
          "name": "collaterals",
          "type": "tuple[]"
        },
        {
          "internalType": "enum IResolver.PaymentToken[]",
          "name": "paymentTokens",
          "type": "uint8[]"
        }
      ],
      "name": "editLend",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract INFTContract[]",
              "name": "nft",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "lendingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct IReNFT.Nfts",
          "name": "nfts",
          "type": "tuple"
        },
        {
          "internalType": "uint256[]",
          "name": "lendAmounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint8[]",
          "name": "maxRentDurations",
          "type": "uint8[]"
        },
        {
          "components": [
            {
              "internalType": "uint24",
              "name": "whole",
              "type": "uint24"
            },
            {
              "internalType": "uint8",
              "name": "decimal",
              "type": "uint8"
            }
          ],
          "internalType": "struct IReNFT.Price[]",
          "name": "dailyRentPrices",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "uint24",
              "name": "whole",
              "type": "uint24"
            },
            {
              "internalType": "uint8",
              "name": "decimal",
              "type": "uint8"
            }
          ],
          "internalType": "struct IReNFT.Price[]",
          "name": "collaterals",
          "type": "tuple[]"
        },
        {
          "internalType": "enum IResolver.PaymentToken[]",
          "name": "paymentTokens",
          "type": "uint8[]"
        }
      ],
      "name": "lend",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC1155BatchReceived",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC1155Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract INFTContract[]",
              "name": "nft",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "lendingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct IReNFT.Nfts",
          "name": "nfts",
          "type": "tuple"
        },
        {
          "internalType": "uint8[]",
          "name": "rentDurations",
          "type": "uint8[]"
        }
      ],
      "name": "rent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rentFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract INFTContract[]",
              "name": "nft",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "lendingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct IReNFT.Nfts",
          "name": "nfts",
          "type": "tuple"
        }
      ],
      "name": "returnIt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "newBeneficiary",
          "type": "address"
        }
      ],
      "name": "setBeneficiary",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "newPaused",
          "type": "bool"
        }
      ],
      "name": "setPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        }
      ],
      "name": "setRentFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "contract INFTContract[]",
              "name": "nft",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "lendingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct IReNFT.Nfts",
          "name": "nfts",
          "type": "tuple"
        }
      ],
      "name": "stopLending",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
};
