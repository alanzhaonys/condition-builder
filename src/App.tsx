import React, { useState } from 'react';
import './App.css';
import URLInput from './components/URLInput';
import ConditionBuilder from './components/ConditionBuilder';
import Results from './components/Results';
import AppContext from './lib/AppContext';
import { Data } from './lib/Data';
import { initData, initFilters } from './lib/init';
import { FilterList } from './lib/FilterList';

function App() {
  const [data, setData] = useState<Data>(initData);
  const [filters, setFilters] = useState<FilterList[]>([]);

  return (
    <AppContext.Provider value={{ data, setData, filters, setFilters }}>
      <div className="App">
        <URLInput />
        <ConditionBuilder />
        <Results />
      </div>
    </AppContext.Provider>
  );
}

export default App;
