export class List<T> {
  private items: Array<T>;

  constructor() {
    this.items = [];
  }

  all(): Array<T> {
    return this.items;
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

  remove(index: number): void {
    delete this.items[index];
  }
}
