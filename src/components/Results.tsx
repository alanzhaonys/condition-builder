import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';
import ResultsTable from '../components/ResultsTable';
import { Search } from '../lib/Search';

function Results() {
  const context = useContext(AppContext);
  const data = context.data;
  const filterGroup = context.filterGroup;
  const search = new Search(data.data, filterGroup);
  console.log('raw data size: ' + data.data.length);
  const filteredData = search.search();
  console.log('filtered data size: ' + filteredData.length);

  return (
    <div className="results">
      <ResultsTable columns={data.columns} rows={filteredData} />
    </div>
  );
}

export default Results;
