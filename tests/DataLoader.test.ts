import 'jest';
import { DataLoader } from '../src/lib/DataLoader';
import fs from 'fs';

describe('DataLoader Tests', () => {
  it('should parse data', async () => {
    // Skip the actual fetch() part
    const array = JSON.parse(
      fs.readFileSync('./tests/y77d-th95.json', 'utf-8'),
    );
    const dataLoader = new DataLoader('test');
    const data = dataLoader.parse(array);

    expect(data.columns.length).toEqual(10);
    expect(data.data.length).toEqual(1000);
  });
});
