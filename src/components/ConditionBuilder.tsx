import React, { useContext } from 'react';
import ConditionGroup from './ConditionGroup';
import AppContext from '../lib/AppContext';

function ConditionBuilder() {
  const context = useContext(AppContext);
  const data = context.data;
  const columns = data.columns;
  const filters = context.filters;

  console.log(filters);

  return (
    <div className="condition-builder">
      {filters &&
        filters.map((filterList, filterListIndex) => (
          <ConditionGroup
            key={`condition-group-${filterListIndex}`}
            filterList={filterList}
            filterListIndex={filterListIndex}
            columns={columns}
          />
        ))}
    </div>
  );
}

export default ConditionBuilder;
