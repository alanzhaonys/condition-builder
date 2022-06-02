import React, { useContext } from 'react';
import ConditionRow from './ConditionRow';
import AppContext from '../lib/AppContext';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';
import Paper from '@mui/material/Paper';

interface Props {
  filterList: FilterList;
  filterListIndex: number;
  columns: Array<string> | undefined;
}

function ConditionGroup({ filterList, filterListIndex, columns }: Props) {
  const context = useContext(AppContext);
  const data = context.data;
  const filterGroup = context.filterGroup;
  const setFilterGroup = context.setFilterGroup;

  const changeLeftConditionCallback = (
    index: number,
    leftCondition: string,
  ) => {
    const filter: Filter = filterList.get(index);
    filter.leftCondition = leftCondition;
    filterList.set(index, filter);
    filterGroup.set(filterListIndex, filterList);
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  const changeOperatorCallback = (index: number, operator: Operator) => {
    const filter: Filter = filterList.get(index);
    filter.operator = operator;
    filterList.set(index, filter);
    filterGroup.set(filterListIndex, filterList);
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  const changeValueCallback = (index: number, value: string) => {
    const filter: Filter = filterList.get(index);
    filter.value = value;
    filterList.set(index, filter);
    filterGroup.set(filterListIndex, filterList);
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  const addConditionRow = () => {
    const newFilter: Filter = {
      leftCondition: data.columns[0],
      operator: Operator.EQ,
      value: '',
    };
    filterList.add(newFilter);
    filterGroup.set(filterListIndex, filterList);
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  const removeConditionRow = (index: number) => {
    filterList.remove(index);
    filterGroup.set(filterListIndex, filterList);
    if (filterList.size() === 0) {
      filterGroup.remove(filterListIndex);
    }
    setFilterGroup(_.cloneDeep(filterGroup));
  };

  return (
    <Paper
      elevation={3}
      className={`condition-group condition-group-${filterListIndex}`}
    >
      <span className="and-connector">AND</span>
      {filterList.size() > 0 &&
        filterList
          .all()
          .map((filter, filterIndex) => (
            <ConditionRow
              key={`condition-row-${filterListIndex}-${filterIndex}`}
              filter={filter}
              filterListIndex={filterListIndex}
              filterIndex={filterIndex}
              columns={columns}
              changeLeftConditionCallback={changeLeftConditionCallback}
              changeOperatorCallback={changeOperatorCallback}
              changeValueCallback={changeValueCallback}
              addCallback={addConditionRow}
              removeCallback={removeConditionRow}
            />
          ))}
    </Paper>
  );
}

export default ConditionGroup;
