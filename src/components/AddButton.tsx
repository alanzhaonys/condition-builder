import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';

function AddButton() {
  const context = useContext(AppContext);
  const data = context.data;
  const filters = context.filters;
  const setFilters = context.setFilters;

  const addConditionGroup = () => {
    const newFilter: Filter = {
      leftCondition: data.columns[0],
      operator: Operator.EQ,
      value: '',
    };
    const newFilterList = new FilterList();
    newFilterList.add(newFilter);
    filters.add(newFilterList);
    setFilters(_.cloneDeep(filters));
  };

  return (
    <div className="add-button">
      <button type="button" onClick={addConditionGroup}>
        Add
      </button>
    </div>
  );
}

export default AddButton;
