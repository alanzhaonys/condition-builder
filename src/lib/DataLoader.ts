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

    if (!response.ok) {
      throw new Error(
        `There is a HTTP error: The status is ${response.status}`,
      );
    }
    return await response.json();
  }

  async load() {
    const json = await this.fetch();
    const columns = Object.keys(json[0]);
    const data: Data = {
      columns: columns,
      data: json,
    };
    return data;
  }
}
