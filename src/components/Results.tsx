import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';
import ResultsTable from '../components/ResultsTable';
import { Search } from '../lib/Search';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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
      <h2>Result</h2>
      <Stack direction="row" spacing={1}>
        <Chip label={`Total: ` + data.data.length} color="primary" />
        <Chip
          label={`Filtered: ` + filteredData.length}
          color="success"
          variant="outlined"
        />
      </Stack>
      <ResultsTable columns={data.columns} rows={filteredData} />
    </div>
  );
}

export default Results;
