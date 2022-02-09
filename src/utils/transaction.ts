import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Transaction } from "../../generated/schema";

export function getOrCreateTransaction(
    id: string,
    createIfNotFound: boolean = true
): Transaction {
    let transaction = Transaction.load(id);

    if(transaction == null && createIfNotFound) {
        transaction = new Transaction(id);
    }

    return transaction as Transaction;
}

export function assignTransaction(
    transaction: Transaction,
    from: Address,
    to: Address | null,
    blockNumber: BigInt,
    timestamp: BigInt
): Transaction {
    transaction.from = from.toHexString();
    transaction.to = to !== null ? to.toHexString() : "";
    transaction.blockNumber = blockNumber;
    transaction.timestamp = timestamp;

    return transaction;
}

export function saveTransaction(
    transaction: Transaction
): void {
    transaction.save();
}
