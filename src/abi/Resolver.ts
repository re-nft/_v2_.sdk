export const Resolver = {
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'CannotResetAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CannotSetSentinel',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotAdmin',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'enum IResolver.PaymentToken',
          name: 'paymentToken',
          type: 'uint8',
        },
      ],
      name: 'getPaymentToken',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint8',
          name: 'paymentToken',
          type: 'uint8',
        },
        {
          internalType: 'address',
          name: 'paymentTokenAddress',
          type: 'address',
        },
      ],
      name: 'setPaymentToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};
