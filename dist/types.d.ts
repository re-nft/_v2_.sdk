export declare enum PaymentToken {
    SENTINEL = 0,
    WETH = 1,
    DAI = 2,
    USDC = 3,
    USDT = 4,
    TUSD = 5,
    ACS = 6
}
export declare type PaymentTokenDetails = {
    address: String;
    scale: number;
};
export declare enum NFTStandard {
    E721 = 0,
    E1155 = 1
}
export declare enum RenftContracts {
    SYLVESTER = 0,
    SYLVESTER_POLYGON = 1,
    AZRAEL = 2,
    WHOOPI_AVALANCHE = 3,
    WHOOPI_FUJI = 4
}
