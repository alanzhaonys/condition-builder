import React from 'react';
import { Filter } from '../../lib/Filter';
import { Operator } from '../../lib/Operator';

interface Props {
  filter: Filter;
  columns: Array<string> | undefined;
}

function ConditionRow({ filter, columns }: Props) {
  const row = 1;
  return (
    <div className="condition-row">
      <label htmlFor={`left-condition-${row}`}>
        Left Condition
        <select id={`left-condition-${row}`} className="left-condition">
          {columns &&
            columns.map((column) => (
              <option
                key={`left-condition-option-${row}-${column}`}
                value={column}
                selected={column === filter.leftCondition}
              >
                {column}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor={`operator-${row}`}>
        Operator
        <select id={`operator-${row}`} className="operator">
          {Object.keys(Operator).map((key) => (
            <option
              key={`operator-${row}-${key}`}
              value={key}
              selected={
                filter.operator === Operator[key as keyof typeof Operator]
              }
            >
              {Operator[key as keyof typeof Operator]}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={`value-${row}`}>
        Value
        <input
          id={`value-${row}`}
          className="value"
          type="text"
          name="value"
          value={filter.value}
        />
        <button type="button">+</button>
        <button type="button">-</button>
      </label>
    </div>
  );
}

export default ConditionRow;
