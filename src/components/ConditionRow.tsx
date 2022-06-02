import React from 'react';
import { Filter } from '../lib/Filter';
import { Operator } from '../lib/Operator';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  filter: Filter;
  filterListIndex: number;
  filterIndex: number;
  columns: Array<string> | undefined;
  changeLeftConditionCallback: (index: number, leftCondition: string) => void;
  changeOperatorCallback: (index: number, operator: Operator) => void;
  changeValueCallback: (index: number, value: string) => void;
  addCallback: (index: number) => void;
  removeCallback: (index: number) => void;
}

function ConditionRow({
  filter,
  filterListIndex,
  filterIndex,
  columns,
  changeLeftConditionCallback,
  changeOperatorCallback,
  changeValueCallback,
  addCallback,
  removeCallback,
}: Props) {
  const changeLeftCondition = (
    filterIndex: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const leftCondition: string = event.currentTarget.value;
    changeLeftConditionCallback(filterIndex, leftCondition);
  };

  const changeOperator = (
    filterIndex: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const operator: string = event.currentTarget.value;
    changeOperatorCallback(
      filterIndex,
      Operator[operator as keyof typeof Operator],
    );
  };

  const changeValue = (
    filterIndex: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const value: string = event.currentTarget.value.trim();
    changeValueCallback(filterIndex, value);
  };

  const uniq = new Date().getTime();
  const index = `${filterListIndex}-${filterIndex}-${uniq}`;
  return (
    <div className={`condition-row condition-row-${index}`} key={index}>
      {filterIndex >= 1 && <span className="or">OR</span>}
      <label htmlFor={`left-condition-${index}`}>
        Left Condition
        <select
          id={`left-condition-${index}`}
          className="left-condition"
          defaultValue={filter.leftCondition}
          onChange={(event) => changeLeftCondition(filterIndex, event)}
        >
          {columns &&
            columns.map((column) => (
              <option
                key={`left-condition-option-${index}-${column}`}
                value={column}
              >
                {column}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor={`operator-${index}`}>
        Operator
        <select
          id={`operator-${index}`}
          className="operator"
          defaultValue={getEnumKeyByEnumValue(Operator, filter.operator)}
          onChange={(event) => changeOperator(filterIndex, event)}
        >
          {Object.keys(Operator).map((key) => (
            <option key={`operator-${index}-${key}`} value={key}>
              {Operator[key as keyof typeof Operator]}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={`value-${index}`}>
        Value
        <input
          id={`value-${index}`}
          className="value"
          type="text"
          name="value"
          defaultValue={filter.value}
          onKeyUp={(event) => changeValue(filterIndex, event)}
        />
        <IconButton
          color="primary"
          aria-label="Add"
          component="span"
          size="large"
          onClick={() => addCallback(filterIndex)}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="warning"
          aria-label="Remove"
          component="span"
          size="large"
          onClick={() => removeCallback(filterIndex)}
        >
          <DeleteIcon />
        </IconButton>
      </label>
    </div>
  );
}

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string,
): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}

export default ConditionRow;
