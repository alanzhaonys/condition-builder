import 'jest';
import { List } from '../src/lib/List';

describe('List Tests', () => {
  it('should create a list of 3 items', () => {
    const list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.size()).toEqual(3);
  });

  it('should reset a list', () => {
    const list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.reset();
    expect(list.size()).toEqual(0);
  });

  it('should change a list item', () => {
    const list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.set(2, 'string');
    expect(list.get(2)).toEqual('string');
  });

  it('should remove a list item', () => {
    const list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(1);
    expect(list.all()).toEqual([1, 3]);
  });

  it('should insert after a list item', () => {
    const list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.insertAfter(1, 'string');
    expect(list.all()).toEqual([1, 2, 'string', 3]);
  });
});
