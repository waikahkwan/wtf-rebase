import { Swap } from "../../generated/schema";

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