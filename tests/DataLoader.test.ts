import 'jest';
import { Data } from '../src/lib/Data';
import { DataLoader } from '../src/lib/DataLoader';
jest.mock('../src/lib/DataLoader.ts');

describe('Project', () => {
  it('should fetch data', async () => {
    const url = 'https://data.nasa.gov/resource/y77d-th95.json';
    const dataLoader = new DataLoader(url);
    const data = await dataLoader.load();
    expect(data.columns.length).toEqual(10);
    expect(data.columns).toHaveProperty('name');
    expect(data.columns).toHaveProperty('id');
    expect(data.data.length).toEqual(10);
    expect(typeof data).toBe('Data');
  });
});
