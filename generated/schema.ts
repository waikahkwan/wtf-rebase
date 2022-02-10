// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("amount0Out", Value.fromBigInt(BigInt.zero()));
    this.set("amount1Out", Value.fromBigInt(BigInt.zero()));
    this.set("amount0In", Value.fromBigInt(BigInt.zero()));
    this.set("amount1In", Value.fromBigInt(BigInt.zero()));
    this.set("to", Value.fromBytes(Bytes.empty()));
    this.set("transaction", Value.fromString(""));
    this.set("pool", Value.fromString(""));
    this.set("type", Value.fromString(""));
    this.set("reserves0Raw", Value.fromBigInt(BigInt.zero()));
    this.set("reserves1Raw", Value.fromBigInt(BigInt.zero()));
    this.set("reserves0", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("reserves1", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("priceToken0Raw", Value.fromBigInt(BigInt.zero()));
    this.set("priceToken1Raw", Value.fromBigInt(BigInt.zero()));
    this.set("priceToken0", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("priceToken1", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Swap entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount0Out(): BigInt {
    let value = this.get("amount0Out");
    return value!.toBigInt();
  }

  set amount0Out(value: BigInt) {
    this.set("amount0Out", Value.fromBigInt(value));
  }

  get amount1Out(): BigInt {
    let value = this.get("amount1Out");
    return value!.toBigInt();
  }

  set amount1Out(value: BigInt) {
    this.set("amount1Out", Value.fromBigInt(value));
  }

  get amount0In(): BigInt {
    let value = this.get("amount0In");
    return value!.toBigInt();
  }

  set amount0In(value: BigInt) {
    this.set("amount0In", Value.fromBigInt(value));
  }

  get amount1In(): BigInt {
    let value = this.get("amount1In");
    return value!.toBigInt();
  }

  set amount1In(value: BigInt) {
    this.set("amount1In", Value.fromBigInt(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get reserves0Raw(): BigInt {
    let value = this.get("reserves0Raw");
    return value!.toBigInt();
  }

  set reserves0Raw(value: BigInt) {
    this.set("reserves0Raw", Value.fromBigInt(value));
  }

  get reserves1Raw(): BigInt {
    let value = this.get("reserves1Raw");
    return value!.toBigInt();
  }

  set reserves1Raw(value: BigInt) {
    this.set("reserves1Raw", Value.fromBigInt(value));
  }

  get reserves0(): BigDecimal {
    let value = this.get("reserves0");
    return value!.toBigDecimal();
  }

  set reserves0(value: BigDecimal) {
    this.set("reserves0", Value.fromBigDecimal(value));
  }

  get reserves1(): BigDecimal {
    let value = this.get("reserves1");
    return value!.toBigDecimal();
  }

  set reserves1(value: BigDecimal) {
    this.set("reserves1", Value.fromBigDecimal(value));
  }

  get priceToken0Raw(): BigInt {
    let value = this.get("priceToken0Raw");
    return value!.toBigInt();
  }

  set priceToken0Raw(value: BigInt) {
    this.set("priceToken0Raw", Value.fromBigInt(value));
  }

  get priceToken1Raw(): BigInt {
    let value = this.get("priceToken1Raw");
    return value!.toBigInt();
  }

  set priceToken1Raw(value: BigInt) {
    this.set("priceToken1Raw", Value.fromBigInt(value));
  }

  get priceToken0(): BigDecimal {
    let value = this.get("priceToken0");
    return value!.toBigDecimal();
  }

  set priceToken0(value: BigDecimal) {
    this.set("priceToken0", Value.fromBigDecimal(value));
  }

  get priceToken1(): BigDecimal {
    let value = this.get("priceToken1");
    return value!.toBigDecimal();
  }

  set priceToken1(value: BigDecimal) {
    this.set("priceToken1", Value.fromBigDecimal(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("symbol", Value.fromString(""));
    this.set("decimals", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("symbol", Value.fromString(""));
    this.set("decimals", Value.fromBigInt(BigInt.zero()));
    this.set("token0", Value.fromString(""));
    this.set("token1", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pool entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get token0(): string {
    let value = this.get("token0");
    return value!.toString();
  }

  set token0(value: string) {
    this.set("token0", Value.fromString(value));
  }

  get token1(): string {
    let value = this.get("token1");
    return value!.toString();
  }

  set token1(value: string) {
    this.set("token1", Value.fromString(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("from", Value.fromString(""));
    this.set("to", Value.fromString(""));
    this.set("blockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transaction entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
