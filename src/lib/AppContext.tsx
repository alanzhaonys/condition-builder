import { createContext } from 'react';
import { Data, initData } from './Data';
import { FilterGroup, initFilterGroup } from './FilterGroup';

interface AppContextInterface {
  data: Data;
  setData: (data: Data) => void;
  filters: FilterGroup;
  setFilters: (filters: FilterGroup) => void;
}

const initAppContext: AppContextInterface = {
  data: initData,
  setData: () => {
    return;
  },
  filters: initFilterGroup,
  setFilters: () => {
    return;
  },
};

const AppContext = createContext<AppContextInterface>(initAppContext);

export default AppContext;
