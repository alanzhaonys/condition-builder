import { Data } from './Data';

export class DataLoader {
  private url: string;
  private method: string;

  constructor(url: string, method = 'GET') {
    this.url = url;
    this.method = method;
  }

  private async fetch() {
    const response = await fetch(this.url, {
      method: this.method,
    });
    return await response.json();
  }

  async load() {
    try {
      const json = await this.fetch();
      if (json.error) {
        throw new Error(json.message);
      }
      return this.parse(json);
    } catch (error) {
      throw new Error('Unable to fetch data');
    }
  }

  parse(json: Array<object>): Data {
    if (!json.length) {
      throw new Error('Unable to fetch data');
    }
    const columns = Object.keys(json[0]);
    const data: Data = {
      columns: columns,
      data: json,
    };
    return data;
  }
}
