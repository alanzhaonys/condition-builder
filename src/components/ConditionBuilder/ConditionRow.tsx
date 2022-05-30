import React from 'react';
import { Operator } from '../../lib/Operator';

function ConditionRow() {
  const row = 1;
  return (
    <div className="condition-row">
      <label htmlFor={`left-condition-${row}`}>
        Left Condition
        <select id={`left-condition-${row}`} className="left-condition">
          <option>xy</option>
        </select>
      </label>
      <label htmlFor={`operator-${row}`}>
        Operator
        <select id={`operator-${row}`} className="operator">
          {Object.keys(Operator).map((key) => (
            <option key={`operator-${row}-${key}`} value={key}>
              {Operator[key as keyof typeof Operator]}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={`value-${row}`}>
        Value
        <input id={`value-${row}`} className="value" type="text" name="value" />
      </label>
    </div>
  );
}

export default ConditionRow;
