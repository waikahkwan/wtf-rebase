import { BigInt } from "@graphprotocol/graph-ts";

export const DEFAULT_DECIMALS = 18;

// Helpers
export function getPrecision(decimals: number = DEFAULT_DECIMALS): BigInt {
  return BigInt.fromI32(10).pow(<u8>decimals);
}
