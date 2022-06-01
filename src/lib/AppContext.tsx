import { createContext } from 'react';
import { Data, initData } from './Data';
import { FilterList, initFilters } from './FilterList';

interface AppContextInterface {
  data: Data;
  setData: (data: Data) => void;
  filters: FilterList[];
  setFilters: (filters: FilterList[]) => void;
}

const initAppContext: AppContextInterface = {
  data: initData,
  setData: () => {
    return;
  },
  filters: initFilters,
  setFilters: () => {
    return;
  },
};

const AppContext = createContext<AppContextInterface>(initAppContext);

export default AppContext;
