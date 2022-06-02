import React, { useState, useContext } from 'react';
import AppContext from '../lib/AppContext';
import { DataLoader } from '../lib/DataLoader';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { initData } from '../lib/Data';
import { initFilterGroup } from '../lib/FilterGroup';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

function URLInput() {
  const context = useContext(AppContext);
  const setData = context.setData;
  const filterGroup = context.filterGroup;
  const setFilterGroup = context.setFilterGroup;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isUrl(url: string): boolean {
    return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(url);
  }

  const loadDataFromUrl = async (url: string) => {
    try {
      setLoading(true);
      filterGroup.reset();
      // Data
      const dataLoader = new DataLoader(url);
      const data = await dataLoader.load();
      setData(data);
      // Filter
      const firstFilter: Filter = {
        leftCondition: data.columns[0],
        operator: Operator.EQ,
        value: '',
      };
      const firstFilterList = new FilterList();
      firstFilterList.add(firstFilter);
      filterGroup.add(firstFilterList);
      setFilterGroup(_.cloneDeep(filterGroup));
      setError(null);
    } catch (error) {
      let errorMessage = '';
      if (error instanceof TypeError) {
        errorMessage = error.message;
      }
      setData(initData);
      setFilterGroup(initFilterGroup);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadUrlEvent = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const url: string = event.target.value.trim();

    if (!isUrl(url)) {
      setData(initData);
      setFilterGroup(initFilterGroup);
      setError('URL entered is invalid');
      return;
    }
    loadDataFromUrl(url);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth>
        <TextField
          id="url"
          name="url"
          label="URL"
          defaultValue="https://data.nasa.gov/resource/y77d-th95.json"
          helperText="Insert data URL. Returning data MUST be an array JSON with each element is key/value pair."
          onChange={loadUrlEvent}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <CircularProgress color="inherit" />}
      </FormControl>
    </Box>
  );
}

export default URLInput;
