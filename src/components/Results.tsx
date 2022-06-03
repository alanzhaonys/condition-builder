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
  const filteredData = search.search();

  console.log(filterGroup);

  return (
    <div className="results">
      <h2>Result</h2>
      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
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
