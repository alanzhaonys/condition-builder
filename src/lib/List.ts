export class List<T> {
  private items: Array<T>;

  constructor() {
    this.items = [];
  }

  all(): Array<T> {
    return this.items;
  }

  reset(): void {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  add(value: T): void {
    this.items.push(value);
  }

  get(index: number): T {
    return this.items[index];
  }

  set(index: number, value: T): void {
    this.items[index] = value;
  }

  remove(index: number): void {
    this.items.splice(index, 1);
  }
}
