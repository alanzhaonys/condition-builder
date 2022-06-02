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
          // make key unique to ensure row will get rerendered
          const uniq = new Date().getTime();
          const key = `condition-group-${filterListIndex}-${uniq}`;
          return (
            <ConditionGroup
              key={key}
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
