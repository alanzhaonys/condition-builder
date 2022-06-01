import React, { useState } from 'react';
import './App.css';
import URLInput from './components/URLInput';
import ConditionBuilder from './components/ConditionBuilder';
import Results from './components/Results';
import AddButton from './components/ConditionBuilder/AddButton';
import AppContext from './lib/AppContext';
import { Data } from './lib/Data';
import { FilterList } from './lib/FilterList';

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [filters, setFilters] = useState<FilterList[] | null>(null);

  return (
    <AppContext.Provider value={{ data, setData, filters, setFilters }}>
      <div className="App">
        <URLInput />
        {data && <ConditionBuilder />}
        <AddButton />
        {data && <Results />}
      </div>
    </AppContext.Provider>
  );
}

export default React.memo(App);
