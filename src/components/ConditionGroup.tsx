import React, { useContext } from 'react';
import ConditionRow from './ConditionRow';
import AppContext from '../lib/AppContext';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { Operator } from '../lib/Operator';
import * as _ from 'lodash';

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
    <div className={`condition-group condition-group-${filterListIndex}`}>
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
              addCallback={addConditionRow}
              removeCallback={removeConditionRow}
            />
          ))}
    </div>
  );
}

export default ConditionGroup;
