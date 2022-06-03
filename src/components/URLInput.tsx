import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../lib/AppContext';
import { DataLoader } from '../lib/DataLoader';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { initData } from '../lib/Data';
import { initFilterGroup } from '../lib/FilterGroup';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

function URLInput() {
  const context = useContext(AppContext);
  const setData = context.setData;
  const filterGroup = context.filterGroup;
  const setFilterGroup = context.setFilterGroup;

  const initUrl = 'https://data.nasa.gov/resource/y77d-th95.json';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(initUrl);

  useEffect(() => {
    loadDataFromUrl(initUrl);
  }, [initUrl]);

  const loadDataFromUrl = async (url: string) => {
    if (loading) {
      return;
    }
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
        id: new Date().getTime().toString(),
      };
      const firstFilterList = new FilterList();
      firstFilterList.add(firstFilter);
      filterGroup.add(firstFilterList);
      console.log('here');
      setFilterGroup(_.cloneDeep(filterGroup));
      setError(null);
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setData(initData);
      setFilterGroup(initFilterGroup);
      setError(errorMessage);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value.trim());
  };

  const onUrlEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      if (!isUrl(url)) {
        setData(initData);
        setFilterGroup(initFilterGroup);
        setError('URL entered is invalid');
        return;
      }
      loadDataFromUrl(url);
    }
  };

  function isUrl(url: string): boolean {
    return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(url);
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'inline-flex', width: 1 }}>
        <FormControl fullWidth sx={{ mr: 2, width: '95%' }}>
          <TextField
            id="url"
            name="url"
            label="URL"
            defaultValue={url}
            error={error ? true : false}
            helperText={
              error
                ? error
                : 'Insert data URL. Returning data MUST be an array JSON with each element is key/value pair.'
            }
            onChange={onUrlChange}
            onKeyPress={onUrlEnter}
          />
        </FormControl>
        <Box sx={{ width: '5%' }}>
          {loading && <CircularProgress color="success" />}
        </Box>
      </Box>
    </Box>
  );
}

export default URLInput;
