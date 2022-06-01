import React, { useState } from 'react';
import './App.css';
import URLInput from './components/URLInput';
import ConditionBuilder from './components/ConditionBuilder';
import Results from './components/Results';
import AddButton from './components/AddButton';
import AppContext from './lib/AppContext';
import { Data, initData } from './lib/Data';
import { FilterGroup, initFilterGroup } from './lib/FilterGroup';

function App() {
  const [data, setData] = useState<Data>(initData);
  const [filterGroup, setFilterGroup] = useState<FilterGroup>(initFilterGroup);

  return (
    <AppContext.Provider value={{ data, setData, filterGroup, setFilterGroup }}>
      <div className="App">
        <URLInput />
        {data.columns.length > 1 && <ConditionBuilder />}
        {data.columns.length > 1 && <AddButton />}
        {data.columns.length > 1 && <Results />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
