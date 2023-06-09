import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { foundry } from 'viem/chains';

export const account = privateKeyToAccount(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
);

export const chain = foundry;

export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: foundry,
  transport: http(),
});

export const receiverAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
