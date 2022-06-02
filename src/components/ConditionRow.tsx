import React from 'react';
import { Filter } from '../lib/Filter';
import { Operator } from '../lib/Operator';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

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
    event: SelectChangeEvent,
  ): void => {
    const leftCondition: string = event.target.value;
    changeLeftConditionCallback(filterIndex, leftCondition);
  };

  const changeOperator = (
    filterIndex: number,
    event: SelectChangeEvent,
  ): void => {
    const operator: string = event.target.value;
    changeOperatorCallback(
      filterIndex,
      Operator[operator as keyof typeof Operator],
    );
  };

  const changeValue = (
    filterIndex: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const value: string = event.target.value.trim();
    changeValueCallback(filterIndex, value);
  };

  const uniq = new Date().getTime();
  const index = `${filterListIndex}-${filterIndex}-${uniq}`;
  return (
    <div className={`condition-row condition-row-${index}`} key={index}>
      <Box
        sx={{
          display: 'inline-flex',
          columnGap: 2,
          width: '100%',
        }}
      >
        {filterIndex >= 1 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p className="or">OR</p>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <FormControl margin="normal" fullWidth>
              <InputLabel id={`left-condition-label-${index}`}>
                Left Condition
              </InputLabel>
              <Select
                labelId={`left-condition-label-${index}`}
                id={`left-condition-${index}`}
                value={filter.leftCondition}
                label="Left Condition"
                onChange={(event) => changeLeftCondition(filterIndex, event)}
              >
                {columns &&
                  columns.map((column) => (
                    <MenuItem
                      key={`left-condition-option-${index}-${column}`}
                      value={column}
                    >
                      {column}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel id={`operator-label-${index}`}>Operator</InputLabel>
              <Select
                labelId={`operator-label-${index}`}
                id={`operator-${index}`}
                value={getEnumKeyByEnumValue(Operator, filter.operator)}
                label="Operator"
                onChange={(event) => changeOperator(filterIndex, event)}
              >
                {Object.keys(Operator).map((key) => (
                  <MenuItem key={`operator-${index}-${key}`} value={key}>
                    {Operator[key as keyof typeof Operator]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id={`value-${index}`}
                label="Value"
                variant="outlined"
                defaultValue={filter.value}
                onChange={(event) => changeValue(filterIndex, event)}
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
        </Box>
      </Box>
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
