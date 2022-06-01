import { List } from './List';
import { FilterList } from './FilterList';

export class FilterGroup extends List<FilterList> {}
export const initFilterGroup = new FilterGroup();
