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
    const json = await this.fetch();
    if (json.error) {
      throw new Error(json.message);
    }
    const columns = Object.keys(json[0]);
    const data: Data = {
      columns: columns,
      data: json,
    };
    return data;
  }
}
