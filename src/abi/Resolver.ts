export const Resolver = {
  "address": "0x048B2ec9634368f08B9eEFFc5554F022E99A892C",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_pt",
          "type": "uint8"
        }
      ],
      "name": "getPaymentToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_pt",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "_v",
          "type": "address"
        }
      ],
      "name": "setPaymentToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
}