import { Swap } from "../generated/LP/LP";
import { getOrCreatePool, getReservesPrice, savePool } from "./utils/pool";
import { assignSwap, calculatePrice, getOrCreateSwap } from "./utils/swap";
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

  let reserves = getReservesPrice(pool);
  swap.reserves0 = reserves.reserves0;
  swap.reserves1 = reserves.reserves1;

  let priceReserves0 = calculatePrice(swap.reserves1, swap.reserves0);
  let priceReserves1 = calculatePrice(swap.reserves0, swap.reserves1);
  
  swap.priceToken0 = priceReserves0;
  swap.priceToken1 = priceReserves1;
  
  swap.save();
}

