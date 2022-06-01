import React, { useContext } from 'react';
import ConditionGroup from './ConditionBuilder/ConditionGroup';
import AppContext from '../lib/AppContext';

function ConditionBuilder() {
  const context = useContext(AppContext);
  const data = context.data;
  const columns = data?.columns;
  const filters = context.filters;

  console.log(data);
  console.log(filters);

  return (
    <div className="condition-builder">
      {filters &&
        filters.map((filterList) => (
          <ConditionGroup filterList={filterList} columns={columns} />
        ))}
    </div>
  );
}

export default ConditionBuilder;
