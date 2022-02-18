import { Swap } from "../generated/LP/LP";
import { swapHandler } from "./mappingHandler/swapHandler";

export function handleSwap(event: Swap): void {
    swapHandler(event);
}



