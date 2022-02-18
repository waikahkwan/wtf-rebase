
import { BigInt } from "@graphprotocol/graph-ts";
import { Swap } from "../../generated/LP/LP";
import { BIGDECIMAL_ZERO, BIGINT_ZERO, SELLING } from "../constants/constant";
import { toDecimal } from "../utils/decimals";
import { getOrCreatePool, savePool, getReservesPrice, getAmountsOut, PriceInterface } from "../utils/pool";
import { getRouterInfo } from "../utils/router";
import { getOrCreateSwap, assignSwap, checkIsSellingOrPurchaseToken } from "../utils/swap";
import { checkTokenBelongsIndex, getAddressForUSDPrice, getOrCreateToken } from "../utils/token";
import { getOrCreateTransaction, assignTransaction } from "../utils/transaction";

export function swapHandler(event: Swap): void {
  let transactionId = event.transaction.hash.toHexString();


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
    pool, 
    transactionId
  );

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


  // Create token object
  let token0 = getOrCreateToken(pool.token0);
  let token1 = getOrCreateToken(pool.token1);

  // Set Reserves
  let reserves = getReservesPrice(pool);
  let reserves0Raw = reserves.reserves0;
  let reserves1Raw = reserves.reserves1;
  let reserves0 = toDecimal(reserves0Raw, token0.decimals.toI32());
  let reserves1 = toDecimal(reserves1Raw, token1.decimals.toI32());

  swap.reserves0Raw = reserves0Raw;
  swap.reserves1Raw = reserves1Raw;
  swap.reserves0 = reserves0;
  swap.reserves1 = reserves1;

  let isToken0USDAddress = pool.is0Stablecoins;
  let isToken1USDAddress = pool.is1Stablecoins;

  // Both tokens are not USD token
  if (!isToken0USDAddress && !isToken1USDAddress) {

    let token0Address = token0.id;
    let token1Address = token1.id;
    let addressForUSDPrice = getAddressForUSDPrice(token0Address);

    // If it's not from token 0, then will be token 1
    if (addressForUSDPrice.toToken == "") {
      addressForUSDPrice = getAddressForUSDPrice(token1Address);
    }

    // Check if the length is 0 again
    if (addressForUSDPrice !== null) {
      let toToken = addressForUSDPrice.toToken;
      let fromToken = addressForUSDPrice.fromToken;

      // Check the token is belongs to which index in pool
      let tokenIndex = checkTokenBelongsIndex(fromToken, pool.token0, pool.token1);
      swap.test = tokenIndex;
      swap.test2 = toToken;
      swap.test3 = fromToken;

      // Check whether is selling or purchase the to be checked token
      let action = checkIsSellingOrPurchaseToken(tokenIndex, swap);
      swap.type = action;

      // Get the amount to be sent to getAmountsOut()
      // Depends on index and action type
      let amountToCheck = BIGINT_ZERO;
      if (tokenIndex == BigInt.fromI32(0)) {

        amountToCheck = action === SELLING
          ? swap.amount0Out
          : swap.amount0In

      } else {

        amountToCheck = action === SELLING
          ? swap.amount1Out
          : swap.amount1In

      }

      // Get Router Info
      let routerInfo = getRouterInfo(poolAddress);

      // Call getAmountsOut() in Router contract
      let amountsOut: PriceInterface = getAmountsOut(
        routerInfo,
        amountToCheck,
        fromToken,
        toToken
      );

      // Set the price of 
      let priceInUSDRaw = amountsOut.amountOutRaw;
      let priceInUSD = amountsOut.amountOut;

      swap.priceInUSDRaw = priceInUSDRaw;
      swap.priceInUSD = priceInUSD;
    }
  } else {
    // To get the index of compared token, which is not the stablecoin
    let tokenIndex = isToken0USDAddress
      ? BigInt.fromI32(1)
      : BigInt.fromI32(0);

    let action = checkIsSellingOrPurchaseToken(tokenIndex, swap);
    swap.type = action;

    // Get the amount to be sent to getAmountsOut()
    // Depends on index and action type

    let priceInUSDRaw = BIGINT_ZERO;
    let priceInUSD = BIGDECIMAL_ZERO;
    if (tokenIndex == BigInt.fromI32(0)) {

      priceInUSDRaw = action == SELLING
        ? swap.amount1In
        : swap.amount1Out

      priceInUSD = toDecimal(priceInUSDRaw, token1.decimals.toI32());

      swap.test2 = "in first condition";

    } else {

      priceInUSDRaw = action == SELLING
        ? swap.amount0In
        : swap.amount0Out

      priceInUSD = toDecimal(priceInUSDRaw, token0.decimals.toI32());

      swap.test2 = "in second condition";

    } 

    swap.priceInUSDRaw = priceInUSDRaw;
    swap.priceInUSD = priceInUSD;

   
  }

  swap.save();
}