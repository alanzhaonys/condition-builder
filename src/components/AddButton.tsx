import React, { useContext } from 'react';
import AppContext from '../lib/AppContext';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';

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
    };
    const newFilterList = new FilterList();
    newFilterList.add(newFilter);
    filterGroup.add(newFilterList);
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  return (
    <div className="add-button">
      <button type="button" onClick={addConditionGroup}>
        + And
      </button>
    </div>
  );
}

export default AddButton;
