import { createContext } from 'react';
import { Data, initData } from './Data';
import { FilterGroup, initFilterGroup } from './FilterGroup';

interface AppContextInterface {
  data: Data;
  setData: (data: Data) => void;
  filterGroup: FilterGroup;
  setFilterGroup: (filterGroup: FilterGroup) => void;
}

const initAppContext: AppContextInterface = {
  data: initData,
  setData: () => {
    return;
  },
  filterGroup: initFilterGroup,
  setFilterGroup: () => {
    return;
  },
};

const AppContext = createContext<AppContextInterface>(initAppContext);

export default AppContext;
