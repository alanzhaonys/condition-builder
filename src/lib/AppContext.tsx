import { createContext } from 'react';
import { Data } from './Data';
import { FilterList } from './FilterList';

interface AppContextInterface {
  data: Data | null;
  setData: (data: Data | null) => void;
  filters: FilterList[] | null;
  setFilters: (filters: FilterList[] | null) => void;
}

const initAppContext: AppContextInterface = {
  data: null,
  setData: () => {
    return;
  },
  filters: null,
  setFilters: () => {
    return;
  },
};

const AppContext = createContext<AppContextInterface>(initAppContext);

export default AppContext;
