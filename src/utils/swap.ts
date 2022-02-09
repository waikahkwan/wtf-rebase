import { BigInt } from "@graphprotocol/graph-ts";
import { Pool, Swap, Transaction } from "../../generated/schema";
import { BIGINT_ZERO, PURCHASE, SELLING } from "../constants/constant";
import { getPrecision } from "./decimals";

export function getOrCreateSwap(
    id: string,
    createIfNotFound: boolean = true
): Swap {
    let swap = Swap.load(id);

    if (swap == null && createIfNotFound) {
        swap = new Swap(id);
    }

    return swap as Swap;
}

export function assignSwap(
    swap: Swap,
    amount0In: BigInt,
    amount0Out: BigInt,
    amount1In: BigInt,
    amount1Out: BigInt,
    transaction: Transaction | null,
    pool: Pool | null
): Swap {
    swap.amount0In = amount0In;
    swap.amount0Out = amount0Out;
    swap.amount1In = amount1In;
    swap.amount1Out = amount1Out;

    if(transaction != null) {
        swap.transaction = transaction.id;
    }

    if(pool != null) {
        swap.pool = pool.id
    }

    // Purchase TIME
    if(amount0In > BIGINT_ZERO && amount1Out > BIGINT_ZERO) {
        swap.type = PURCHASE;
    } 

    // Selling TIME
    if(amount1In > BIGINT_ZERO && amount0Out > BIGINT_ZERO) {
        swap.type = SELLING;
    }
   
    return swap;
}

export function calculatePrice (
    tokenA: BigInt,
    tokenB: BigInt,
): BigInt {

    if(tokenA === BIGINT_ZERO || tokenB === BIGINT_ZERO) {
        return BIGINT_ZERO;
    }

    let price = tokenA.div(tokenB).times(getPrecision(18));

    return price;
}