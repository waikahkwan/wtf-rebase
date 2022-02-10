import { BigInt } from "@graphprotocol/graph-ts";
import { Swap } from "../generated/LP/LP";
import { toBigInt, toDecimal } from "./utils/decimals";
import { getOrCreatePool, getReservesPrice, savePool } from "./utils/pool";
import { assignSwap, calculatePrice, getOrCreateSwap } from "./utils/swap";
import { getOrCreateToken } from "./utils/token";
import { assignTransaction, getOrCreateTransaction } from "./utils/transaction";

export function handleSwap(event: Swap): void {
  let transactionId = event.transaction.hash.toHexString();

  // Create transaction
  let transaction = getOrCreateTransaction(transactionId);
  transaction = assignTransaction(
    transaction,
    event.transaction.from,
    event.transaction.to,
    event.block.number,
    event.block.timestamp
  )
  transaction.save();

  // Get Pool
  let poolAddress = event.address.toHexString();
  let pool = getOrCreatePool(poolAddress);
  savePool(pool);

  // Create Swap
  let swap = getOrCreateSwap(transactionId);
  assignSwap(
    swap,
    event.params.amount0In,
    event.params.amount0Out,
    event.params.amount1In, 
    event.params.amount1Out,
    transaction,
    pool
  );

  // Create token object
  let token0 = getOrCreateToken(pool.token0);
  let token1 = getOrCreateToken(pool.token1);

  let reserves = getReservesPrice(pool);
  let reserves0Raw = reserves.reserves0;
  let reserves1Raw = reserves.reserves1;

  let reserves0  = toDecimal(reserves0Raw, token0.decimals.toI32());
  let reserves1 = toDecimal(reserves1Raw, token1.decimals.toI32());

  swap.reserves0Raw = reserves0Raw;
  swap.reserves1Raw = reserves1Raw;
  swap.reserves0 = reserves0;
  swap.reserves1 = reserves1;

  let priceReserves0Raw = calculatePrice(reserves1, reserves0);
  let priceReserves1Raw = calculatePrice(reserves0, reserves1);
  
  swap.priceToken0Raw = priceReserves0Raw;
  swap.priceToken1Raw = priceReserves1Raw;

  let priceReserves0 = toDecimal(priceReserves0Raw, 18);
  let priceReserves1 = toDecimal(priceReserves1Raw, 18);

  swap.priceToken0 = priceReserves0;
  swap.priceToken1 = priceReserves1;
  
  swap.save();
}

