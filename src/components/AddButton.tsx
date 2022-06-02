import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';
import Button from '@mui/material/Button';

function AddButton() {
  const context = useContext(AppContext);
  const data = context.data;
  const filterGroup = context.filterGroup;
  const setFilterGroup = context.setFilterGroup;

  const addConditionGroup = () => {
    const newFilter: Filter = {
      leftCondition: data.columns[0],
      operator: Operator.EQ,
      value: '',
      id: new Date().getTime().toString(),
    };
    const newFilterList = new FilterList();
    newFilterList.add(newFilter);
    filterGroup.add(newFilterList);
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  return (
    <div className="add-button">
      <Button variant="outlined" onClick={addConditionGroup}>
        + And
      </Button>
    </div>
  );
}

export default AddButton;
