import React from 'react';
import ConditionRow from './ConditionRow';
import { FilterList } from '../../lib/FilterList';

interface Props {
  filterList: FilterList;
  columns: Array<string> | undefined;
}

function ConditionGroup({ filterList, columns }: Props) {
  return (
    <div className="condition-group">
      {filterList.size() > 0 &&
        filterList
          .all()
          .map((filter) => <ConditionRow filter={filter} columns={columns} />)}
    </div>
  );
}

export default ConditionGroup;
