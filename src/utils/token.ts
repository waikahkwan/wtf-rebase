import { Token } from "../../generated/schema";
import { Token as LPToken } from "../../generated/LP/Token";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { BIGINT_ZERO } from "../constants/constant";
import { AddressesForUsdPrice, IAddressesForUSD, ToAddressesForUsdPrice } from "../constants/router";

export function getOrCreateToken(
    id: string,
    createIfNotFound: boolean = true 
) : Token {
    let token = Token.load(id);

    if(token == null && createIfNotFound) {
        token = new Token(id);

        let tokenContract = LPToken.bind(Address.fromString(id));

        let symbol = tokenContract.try_symbol();
        let finalSymbol = !symbol.reverted
            ? symbol.value
            : "";
    
        let decimals = tokenContract.try_decimals();
        let finalDecimals = !decimals.reverted
            ? BigInt.fromI32(decimals.value)
            : BIGINT_ZERO;

        token.symbol = finalSymbol;
        token.decimals = finalDecimals;
    }

    return token as Token;
} 

export function getAddressForUSDPrice(
    address: string,
): IAddressesForUSD {

    let toToken = "";
    if(AddressesForUsdPrice.includes(address.toLowerCase())) {
        let index = AddressesForUsdPrice.indexOf(address.toLowerCase());
        toToken = ToAddressesForUsdPrice.at(index);
    }
    
    return {
        fromToken: address,
        toToken: toToken
    };
}


export function checkTokenBelongsIndex(
    address: string,
    token0: string, 
    token1: string,
): BigInt {

    if(address.toLowerCase() == token0.toLowerCase()) {
        return BigInt.fromI32(0);
    }

    if(address.toLowerCase() == token1.toLowerCase()) {
        return BigInt.fromI32(1);
    }

    return BigInt.fromI32(2);
}