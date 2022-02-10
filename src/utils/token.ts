import { Token } from "../../generated/schema";
import { Token as LPToken } from "../../generated/LP/Token";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { BIGINT_ZERO } from "../constants/constant";

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