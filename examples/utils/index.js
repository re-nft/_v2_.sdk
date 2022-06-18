const { Contract } = require('@ethersproject/contracts');

// fuji payment tokens
const FUJI_USDC = "0x43CDA502069B1dFa4f7C1a1625Bc6be47cD0bD88";
const FUJI_DAI = "0x40E71a970Ff1fbd21A53b4d2dbc102Be0E1d574f";
const FUJI_USDT = "0x051DE28a8B5836f678A13d19EE7F8c167b4Ca54D";


const erc20Abi = [
    // only some of the fuji erc20s support mint
    // (only tested on usdc: 0x43CDA502069B1dFa4f7C1a1625Bc6be47cD0bD88)
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // this is a standard, function, though, and all erc20 should support it
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const erc1155Abi = [
    {
        "inputs": [
            {
            "internalType": "address",
            "name": "operator",
            "type": "address"
            },
            {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const mintPaymentToken = async (address, wallet) => {
    const contract = new Contract(address, erc20Abi, wallet);
    const txn = await contract.mint(wallet.address, "1000000000");
    const receipt = await txn.wait();
    return receipt;
};

const approvePaymentToken = async (address, wallet, spender, amount) => {
    const contract = new Contract(address, erc20Abi, wallet);
    const txn = await contract.approve(spender, amount);
    const receipt = await txn.wait();
    return receipt;
}

const approveNftForAll = async (address, wallet, operator) => {
    const contract = new Contract(address, erc1155Abi, wallet);
    const txn = await contract.setApprovalForAll(operator, true);
    const receipt = await txn.wait();
    return receipt;
}

module.exports = {
    FUJI_USDC,
    FUJI_DAI,
    FUJI_USDT,
    erc20Abi,
    erc1155Abi,
    mintPaymentToken,
    approvePaymentToken,
    approveNftForAll,
}
