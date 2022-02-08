import {Swap} from "../generated/Contract/Contract";
import { getOrCreateSwap } from "./utils/transaction";

export function handleSwap(event: Swap): void {
  let transactionId = event.address
    .toHexString()
    .concat("-")
    .concat(event.transaction.hash.toHexString())
    .concat("-")
    .concat(event.logIndex.toString());

  let swap = getOrCreateSwap(transactionId);
  swap.amount0In = event.params.amount0In;
  swap.amount0Out = event.params.amount0Out;
  swap.amount1In = event.params.amount1In;
  swap.amount1Out = event.params.amount1Out;

  swap.save();
}

