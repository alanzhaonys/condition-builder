import React, { useContext } from 'react';
import ConditionGroup from './ConditionGroup';
import AppContext from '../lib/AppContext';

function ConditionBuilder() {
  const context = useContext(AppContext);
  const data = context.data;
  const columns = data.columns;
  const filterGroup = context.filterGroup;

  console.log(filterGroup);

  return (
    <div className="condition-builder">
      {filterGroup &&
        filterGroup.all().map((filterList, filterListIndex) => {
          return (
            <ConditionGroup
              key={`condition-group-${filterListIndex}`}
              filterList={filterList}
              filterListIndex={filterListIndex}
              columns={columns}
            />
          );
        })}
    </div>
  );
}

export default ConditionBuilder;
