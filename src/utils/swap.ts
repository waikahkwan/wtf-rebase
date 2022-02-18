import { BigInt } from "@graphprotocol/graph-ts";
import { Pool, Swap } from "../../generated/schema";
import { BIGINT_ZERO, PURCHASE, SELLING } from "../constants/constant";

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
    pool: Pool | null, 
    transactionId: string
): Swap {
    swap.amount0In = amount0In;
    swap.amount0Out = amount0Out;
    swap.amount1In = amount1In;
    swap.amount1Out = amount1Out;
    swap.transaction = transactionId;

    if(pool != null) {
        swap.pool = pool.id
    }

    return swap;
}

export class ICheckIsSellingOrPurchaseToken {
    action: String
    amountIn: BigInt
    amountOut: BigInt
}

export function checkIsSellingOrPurchaseToken(
    tokenIndex: BigInt,
    swap: Swap
): string {

    if(tokenIndex === BigInt.fromI32(0)) {
        // If token 0 = TIME, token 1 = AVAX, this case = use TIME to purchase AVAX, therefore SELLING
        if(swap.amount0Out > BIGINT_ZERO && swap.amount1In > BIGINT_ZERO) {
            return SELLING;
        }

        // If token 0 = TIME, token 1 = AVAX, this case = use AVAX to purchase TIME, therefore PURCHASE
        if(swap.amount0In > BIGINT_ZERO && swap.amount1Out > BIGINT_ZERO) {
            return PURCHASE;
        }

    } else {
         // If token 0 = AVAX, token 1 = TIME, this case = use AVAX to purchase TIME, therefore SELLING
         if(swap.amount0Out > BIGINT_ZERO && swap.amount1In > BIGINT_ZERO) {
            return PURCHASE;
        }

        // If token 0 = AVAX, token 1 = TIME, this case = use TIME to purchase AVAX, therefore PURCHASE
        if(swap.amount0In > BIGINT_ZERO && swap.amount1Out > BIGINT_ZERO) {
            return SELLING;
        }
    }

    return "";
}