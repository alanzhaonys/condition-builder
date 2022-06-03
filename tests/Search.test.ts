import 'jest';
import { DataLoader } from '../src/lib/DataLoader';
import { FilterGroup } from '../src/lib/FilterGroup';
import { FilterList } from '../src/lib/FilterList';
import { Filter } from '../src/lib/Filter';
import { Operator } from '../src/lib/Operator';
import { Search } from '../src/lib/Search';
import fs from 'fs';

describe('DataLoader Tests', () => {
  const array = JSON.parse(fs.readFileSync('./tests/y77d-th95.json', 'utf-8'));
  const dataLoader = new DataLoader('test');
  const data = dataLoader.parse(array);

  it('should do a single Equal search', async () => {
    const filterGroup = new FilterGroup();
    const filterList = new FilterList();
    const filter: Filter = {
      id: 'random-id',
      leftCondition: 'name',
      operator: Operator.EQ,
      value: 'Aachen',
    };
    filterList.add(filter);
    filterGroup.add(filterList);
    const search = new Search(data.data, filterGroup);
    const results = search.search();
    expect(results.length).toEqual(1);
  });

  it('should do a single Regex search', async () => {
    const filterGroup = new FilterGroup();
    const filterList = new FilterList();
    const filter: Filter = {
      id: 'random-id',
      leftCondition: 'reclat',
      operator: Operator.REGEX,
      value: '^-?\\d*\\.?\\d*$',
    };
    filterList.add(filter);
    filterGroup.add(filterList);
    const search = new Search(data.data, filterGroup);
    const results = search.search();
    expect(results.length).toEqual(988);
  });

  it('should do a composite search', async () => {
    const filterGroup = new FilterGroup();

    const filterList1 = new FilterList();
    const filter1: Filter = {
      id: 'random-id',
      leftCondition: 'name',
      operator: Operator.C,
      value: 'aa',
    };
    filterList1.add(filter1);

    const filterList2 = new FilterList();
    const filter2: Filter = {
      id: 'random-id',
      leftCondition: 'nametype',
      operator: Operator.EQ,
      value: 'Valid',
    };
    filterList2.add(filter2);

    filterGroup.add(filterList1);
    filterGroup.add(filterList2);

    const search = new Search(data.data, filterGroup);
    const results = search.search();
    expect(results.length).toEqual(2);
  });
});
