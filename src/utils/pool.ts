import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Pool, Token } from "../../generated/schema";
import { LP } from "../../generated/LP/LP";
import { BIGDECIMAL_ZERO, BIGINT_ZERO } from "../constants/constant";
import { getOrCreateToken } from "./token";
import { Router } from "../../generated/LP/Router";
import { toDecimal } from "./decimals";
import { IRouter, Stablecoins } from "../constants/router";

export function getOrCreatePool(
    id: string,
    createIfNotFound: boolean = true
): Pool {
    let pool = Pool.load(id);

    if (pool == null && createIfNotFound) {
        pool = new Pool(id);

        let poolContract = LP.bind(Address.fromString(id));

        let decimals = poolContract.try_decimals();
        let finalDecimals = !decimals.reverted ? BigInt.fromI32(decimals.value) : BIGINT_ZERO;

        let token0 = poolContract.try_token0();
        let finalToken0 = !token0.reverted ? token0.value.toHexString() : "";

        if(finalToken0 != "") {
            let firstToken = getOrCreateToken(finalToken0);
            firstToken.save();

            pool.token0 = firstToken.id;

            // Check token0 is stablecoins
            let isToken0Stablecoins  = Stablecoins.includes(finalToken0.toLowerCase());
            pool.is0Stablecoins = isToken0Stablecoins ? true : false;
        }

        let token1 = poolContract.try_token1();
        let finalToken1 = !token1.reverted ? token1.value.toHexString() : "";

        if(finalToken1 != "") {
            let secondToken = getOrCreateToken(finalToken1);
            secondToken.save();

            pool.token1 = secondToken.id;

            // Check token1 is stablecoins
            let isToken1Stablecoins  = Stablecoins.includes(finalToken1.toLowerCase());
            pool.is1Stablecoins = isToken1Stablecoins ? true : false;
        }

        let symbol = poolContract.try_symbol();
        let finalSymbol = !symbol.reverted ? symbol.value : "";

        assignPool(pool, finalSymbol, finalDecimals);
    }

    return pool as Pool;
}

export function assignPool(
    pool: Pool,
    symbol: string,
    decimals: BigInt,
) : Pool {
    pool.symbol = symbol;
    pool.decimals = decimals;

    return pool;
}

export function savePool(
    pool : Pool
): void {
    pool.save();
}

export class ReservesInterface {
    reserves0 : BigInt
    reserves1 : BigInt
}

export function getReservesPrice(
    pool: Pool
): ReservesInterface {
    
    let result : ReservesInterface = {
        reserves0: BIGINT_ZERO,
        reserves1: BIGINT_ZERO
    }

    let poolContract =  LP.bind(Address.fromString(pool.id));
    let reserves = poolContract.try_getReserves();
    let finalReserves = !reserves.reverted
        ? reserves.value
        : null;

    if(finalReserves != null) {
        result.reserves0 = finalReserves.value0;
        result.reserves1 = finalReserves.value1;
    }

    return result;
}

export class PriceInterface  {
    from: Token
    to: Token
    amountInRaw: BigInt
    amountOutRaw: BigInt
    amountIn: BigDecimal
    amountOut: BigDecimal
}

export function getAmountsOut(
    routerInfo: IRouter | null,
    amountInRaw: BigInt, 
    from: string,
    to: string
) : PriceInterface {

    // Create token info
    let token0 = getOrCreateToken(from);
    let token1 = getOrCreateToken(to);

    if(routerInfo == null) {
        return {
            amountInRaw: BIGINT_ZERO,
            amountOutRaw: BIGINT_ZERO, 
            amountIn: BIGDECIMAL_ZERO,
            amountOut: BIGDECIMAL_ZERO,
            from: token0,
            to: token1
        }
    }

    // Prepare param for function call
    let path: Address[] = [Address.fromString(from), Address.fromString(to)];
   
    // Create Router Contract
    let router = Router.bind(Address.fromString(routerInfo.routerAddress));
    

    let callResult = router.try_getAmountsOut(amountInRaw, path);
    let finalCallResult = !callResult.reverted
        ? callResult.value
        : [];

    // Getting result for function call
    let amountOutRaw: BigInt = finalCallResult.length > 0
        ? finalCallResult[1]
        : BIGINT_ZERO;

    let amountIn = toDecimal(amountInRaw, token0.decimals.toI32());
    let amountOut = toDecimal(amountOutRaw, token1.decimals.toI32());


    let result: PriceInterface = {
        amountInRaw,
        amountOutRaw, 
        amountIn,
        amountOut,
        from: token0,
        to: token1
    }

    return result;
}

