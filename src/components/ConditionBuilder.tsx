import React, { useContext } from 'react';
import AddButton from './ConditionBuilder/AddButton';
import ConditionGroup from './ConditionBuilder/ConditionGroup';
import AppContext from '../lib/AppContext';

function ConditionBuilder() {
  const context = useContext(AppContext);
  const data = context.data;

  console.log(data);

  return (
    <div className="condition-builder">
      <div>
        {/*data.columns.map((column) => <li key={column}>{column}</li>)*/}
      </div>
      <ConditionGroup />
      <AddButton />
    </div>
  );
}

export default ConditionBuilder;
