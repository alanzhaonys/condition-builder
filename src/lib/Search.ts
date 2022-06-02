import { FilterGroup } from './FilterGroup';
import { Filter } from './Filter';
import { Operator } from './Operator';

export class Search {
  private data: Array<object>;
  private filterGroup: FilterGroup;
  private filteredData: Array<object> = [];

  constructor(data: Array<object>, filterGroup: FilterGroup) {
    this.data = data;
    this.filterGroup = filterGroup;
  }

  search(): Array<object> {
    this.data.forEach((data) => {
      if (this.filterData(data)) {
        this.filteredData.push(data);
      }
    });
    return this.filteredData;
  }

  private filterData(data: object): boolean {
    const andConditions: Array<boolean> = [];
    const filterLinks = this.filterGroup.all();
    for (let i = 0; i < filterLinks.length; i++) {
      const filterLink = filterLinks[i];
      const orConditions: Array<boolean> = [];
      const filters = filterLink.all();
      for (let j = 0; j < filters.length; j++) {
        const filter = filters[j];
        // ignore empty value
        if (filter.value.length === 0) {
          continue;
        }
        orConditions.push(this.evalCondition(data, filter));
      }
      if (orConditions.length > 0) {
        andConditions.push(orConditions.includes(true));
      }
    }
    return !andConditions.includes(false);
  }

  private evalCondition(data: object, filter: Filter): boolean {
    let value: string = data[filter.leftCondition as keyof typeof data];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    switch (filter.operator) {
      case Operator.EQ:
        // shallow equality
        return value == filter.value;
        break;
      case Operator.GT:
        return Number(value) > Number(filter.value);
        break;
      case Operator.LT:
        return Number(value) > Number(filter.value);
        break;
      case Operator.C:
        return String(value).toLowerCase().includes(filter.value.toLowerCase());
        break;
      case Operator.NC:
        return !String(value)
          .toLowerCase()
          .includes(filter.value.toLowerCase());
        break;
      case Operator.REGEX: {
        const regex = new RegExp(filter.value);
        return regex.test(String(value));
        break;
      }
      default:
        return false;
    }
    return false;
  }
}
