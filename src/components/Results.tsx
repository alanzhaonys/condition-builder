import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';
import ResultsTable from '../components/ResultsTable';

function Results() {
  const context = useContext(AppContext);
  const data = context.data;

  return (
    <div className="results">
      <ResultsTable columns={data.columns} rows={data.data} />
    </div>
  );
}

export default Results;
