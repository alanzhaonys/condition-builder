import React, { useContext } from 'react';
import ConditionRow from './ConditionRow';
import AppContext from '../lib/AppContext';
import { Filter } from '../lib/Filter';
import { FilterList } from '../lib/FilterList';
import { Operator } from '../lib/Operator';

interface Props {
  filterList: FilterList;
  filterListIndex: number;
  columns: Array<string> | undefined;
}

function ConditionGroup({ filterList, filterListIndex, columns }: Props) {
  const context = useContext(AppContext);
  const data = context.data;
  const filters = context.filters;
  const setFilters = context.setFilters;

  const addConditionRow = () => {
    const newFilter: Filter = {
      leftCondition: data.columns[0],
      operator: Operator.EQ,
      value: '',
    };
    filterList.add(newFilter);
    filters[filterListIndex] = filterList;
    // A new copy of filters
    setFilters([...filters]);
    console.log(filterListIndex);
  };

  const removeConditionRow = (index: number) => {
    filters[filterListIndex].remove(index);
    if (filters[filterListIndex].size() === 0) {
      // Remove this group
      filters.splice(filterListIndex, 1);
    }
    // A new copy of filters
    setFilters([...filters]);
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
