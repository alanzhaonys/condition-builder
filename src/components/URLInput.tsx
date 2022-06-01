import React, { useState, useContext } from 'react';
import AppContext from '../lib/AppContext';
import { DataLoader } from '../lib/DataLoader';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { initData } from '../lib/Data';
import { initFilterGroup } from '../lib/FilterGroup';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';

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

  const loadUrlEvent = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const url: string = event.currentTarget.value.trim();

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

  return (
    <div>
      <input type="text" name="url" onKeyDown={loadUrlEvent} />
      <p>
        Insert data URL. Returning data MUST be an array JSON with each element
        is key/value pair.
      </p>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">loading...</p>}
    </div>
  );
}

export default URLInput;
