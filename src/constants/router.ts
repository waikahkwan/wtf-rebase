const TRADER_JOE_ADDRESS: string = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4";
const SUSHISWAP_ADDRESS: string = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
const UNISWAP_ADDRESS: string = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const PANCAKE_ADDRESS: string = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const SUSHISWAP_POLYGON_ADDRESS: string = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const SPOOKYSWAP_ADDRESS: string = "0xF491e7B69E4244ad4002BC14e878a34207E38c29";
const SPIRITSWAP_ADDRESS: string = "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52";

// {symbol}_{network}_ADDRESS
const MIM_AVAX_ADDRESS = "0x130966628846bfd36ff31a822705796e8cb8c18d";
const DAI_ETH_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
const FRAX_ETH_ADDRESS = "0x853d955acef822db058eb8505911ed77f175b99e";
const BUSD_BSC_ADDRESS = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
const DAI_FANTOM_ADDRESS = "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e";
const USDC_FANTOM_ADDRESS = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";

const TIME_AVAX_ADDRESS = "0xb54f16fb19478766a268f172c9480f8da1a7c9c3";
const OHM_ETHEREUM_ADDRESS = "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5";
const KLIMA_POLYGON_ADDRESS = "0x4e78011ce80ee02d2c3e649fb657e45898257815";
const USDC_POLYGON_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";

export const Stablecoins : string[] = [
    MIM_AVAX_ADDRESS,
    DAI_ETH_ADDRESS,
    FRAX_ETH_ADDRESS,
    BUSD_BSC_ADDRESS,
    DAI_FANTOM_ADDRESS,
    USDC_FANTOM_ADDRESS,
    USDC_POLYGON_ADDRESS,
];

// To get 
export const ToCompareCoins = [
    OHM_ETHEREUM_ADDRESS,
    TIME_AVAX_ADDRESS,
    KLIMA_POLYGON_ADDRESS, 
];

// Addreses which need to execute getAmountsOut() 
// export const AddressesForUsdPrice = {
//     [TIME_AVAX_ADDRESS]: MIM_AVAX_ADDRESS,
//     [OHM_ETHEREUM_ADDRESS]: DAI_ETH_ADDRESS,
//     [KLIMA_POLYGON_ADDRESS]: USDC_POLYGON_ADDRESS
// };
// export const AddressesForUsdPrice: IAddressesForUSD[] (
//     { fromToken: TIME_AVAX_ADDRESS, toToken: MIM_AVAX_ADDRESS },
//     { fromToken: OHM_ETHEREUM_ADDRESS, toToken: DAI_ETH_ADDRESS },
//     { fromToken: KLIMA_POLYGON_ADDRESS, toToken: USDC_POLYGON_ADDRESS }
// )

// Addreses which need to execute getAmountsOut() 
export class IAddressesForUSD {
    toToken: string
    fromToken: string
}
export const AddressesForUsdPrice : string[] = [
    TIME_AVAX_ADDRESS,
    OHM_ETHEREUM_ADDRESS,
    KLIMA_POLYGON_ADDRESS
];
export const ToAddressesForUsdPrice: string[] = [
    MIM_AVAX_ADDRESS,
    DAI_ETH_ADDRESS,
    USDC_POLYGON_ADDRESS
];


export class IRouter{
    pairAddress: string
    routerAddress: string
    isWithStablecoin: boolean
}
export const Pairs: string[] = [
    "0x089a9bf16453b519fab02e40d143c0dcf9083778", // CROWN <-> MIM
    "0xa03a99cd3d553fe9ebbccecabcb8c47100482f72", // PAPA <-> MIM
    "0xf64e1c5b6e17031f5504481ac8145f4c3eab4917", // TIME <-> AVAX
    "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df", // TIME <-> MIM
    "0x055475920a8c93cffb64d039a8205f7acc7722d3", // OHM <-> DAI
    "0x69b81152c5a8d35a67b32a4d3772795d96cae4da", // OHM <-> ETH
    "0x6021444f1706f15465bee85463bcc7d7cc17fc03", // TEMPLE <-> FRAX
    "0x46503d91d7a41fcbdc250e84cee9d457d082d7b4", // JADE <-> BUSD
    "0x5438c0730e45ef25ec5e5110c939dc0c90aec4b4", // META <-> BUSD
    "0x9803c7ae526049210a1725f7487af26fe2c24614", // KLIMA <-> BCT
    "0xbc0eecda2d8141e3a26d2535c57cadcb1095bca9", // HEC <-> DAI
    "0xd661952749f05acc40503404938a91af9ac1473b", // HEC <-> USDC
];

export const Router: IRouter[] = [
    { pairAddress: "0x089a9bf16453b519fab02e40d143c0dcf9083778", routerAddress: TRADER_JOE_ADDRESS, isWithStablecoin: true }, // CROWN <-> MIM
    { pairAddress: "0xa03a99cd3d553fe9ebbccecabcb8c47100482f72", routerAddress: TRADER_JOE_ADDRESS, isWithStablecoin: true }, // PAPA <-> MIM
    { pairAddress: "0xf64e1c5b6e17031f5504481ac8145f4c3eab4917", routerAddress: TRADER_JOE_ADDRESS ,isWithStablecoin: false}, // TIME <-> AVAX
    { pairAddress: "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df", routerAddress: TRADER_JOE_ADDRESS ,isWithStablecoin: true}, // TIME <-> MIM
    { pairAddress: "0x055475920a8c93cffb64d039a8205f7acc7722d3", routerAddress: SUSHISWAP_ADDRESS ,isWithStablecoin: true}, // OHM <-> DAI
    { pairAddress: "0x69b81152c5a8d35a67b32a4d3772795d96cae4da", routerAddress: SUSHISWAP_ADDRESS ,isWithStablecoin: false}, // OHM <-> ETH
    { pairAddress: "0x6021444f1706f15465bee85463bcc7d7cc17fc03", routerAddress: UNISWAP_ADDRESS ,isWithStablecoin: true}, // TEMPLE <-> FRAX
    { pairAddress: "0x46503d91d7a41fcbdc250e84cee9d457d082d7b4", routerAddress: PANCAKE_ADDRESS ,isWithStablecoin: true}, // JADE <-> BUSD
    { pairAddress: "0x5438c0730e45ef25ec5e5110c939dc0c90aec4b4", routerAddress: PANCAKE_ADDRESS ,isWithStablecoin: true}, // META <-> BUSD
    { pairAddress: "0x9803c7ae526049210a1725f7487af26fe2c24614", routerAddress: SUSHISWAP_POLYGON_ADDRESS ,isWithStablecoin: false}, // KLIMA <-> BCT
    { pairAddress: "0xbc0eecda2d8141e3a26d2535c57cadcb1095bca9", routerAddress: SPOOKYSWAP_ADDRESS ,isWithStablecoin: true}, // HEC <-> DAI
    { pairAddress: "0xd661952749f05acc40503404938a91af9ac1473b", routerAddress: SPIRITSWAP_ADDRESS ,isWithStablecoin: true}, // HEC <-> USDC
];