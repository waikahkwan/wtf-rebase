import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Pool } from "../../generated/schema";
import { LP } from "../../generated/LP/LP";
import { BIGINT_ZERO } from "../constants/constant";
import { getOrCreateToken } from "./token";

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
        }

        let token1 = poolContract.try_token1();
        let finalToken1 = !token1.reverted ? token1.value.toHexString() : "";

        if(finalToken1 != "") {
            let secondToken = getOrCreateToken(finalToken1);
            secondToken.save();

            pool.token1 = secondToken.id;
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