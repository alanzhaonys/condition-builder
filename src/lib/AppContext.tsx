import { createContext } from 'react';
import { Data } from './Data';
import { FilterList } from './FilterList';
import { initData, initFilters } from './init';

const AppContext = createContext({
  data: initData,
  setData: (data: Data) => {
    //
  },
  filters: initFilters,
  setFilters: (filters: FilterList[]) => {
    //
  },
});

export default AppContext;
