import React, { useState, useTransition } from 'react';
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
import Skeleton from '@mui/material/Skeleton';

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
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>();
  const [placeholder, setPlaceholder] = useState<boolean>(false);
  const changeLeftCondition = (
    filterIndex: number,
    event: SelectChangeEvent,
  ): void => {
    const leftCondition: string = event.target.value;
    changeLeftConditionCallback(filterIndex, leftCondition);
  };

  const changeOperator = (
    filter: Filter,
    filterIndex: number,
    event: SelectChangeEvent,
  ): void => {
    const operator: string = event.target.value;
    setError(null);
    changeOperatorCallback(
      filterIndex,
      Operator[operator as keyof typeof Operator],
    );
  };

  const changeValue = (
    filter: Filter,
    filterIndex: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    startTransition(() => {
      const value: string = event.target.value.trim();
      checkNumericError(filter, value);
      changeValueCallback(filterIndex, value);
    });
  };

  const addHover = (): void => {
    setPlaceholder(true);
  };

  const addLeave = (): void => {
    setPlaceholder(false);
  };

  function checkNumericError(filter: Filter, value: string) {
    if (
      [Operator.GT, Operator.LT].includes(filter.operator) &&
      !/^-?\d*\.?\d*$/.test(value)
    ) {
      setError('Value must be numeric');
    } else {
      setError(null);
    }
  }

  const index = `${filterListIndex}-${filterIndex}`;
  return (
    <div className={`condition-row condition-row-${index}`}>
      <Box
        sx={{
          display: 'inline-flex',
          columnGap: 2,
          width: '100%',
        }}>
        {filterIndex >= 1 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <p className="or">OR</p>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}>
            <FormControl margin="normal" fullWidth>
              <InputLabel id={`left-condition-label-${index}`}>
                Left Condition
              </InputLabel>
              <Select
                labelId={`left-condition-label-${index}`}
                id={`left-condition-${index}`}
                value={filter.leftCondition}
                label="Left Condition"
                onChange={(event) => changeLeftCondition(filterIndex, event)}>
                {columns &&
                  columns.map((column) => (
                    <MenuItem
                      key={`left-condition-option-${index}-${column}`}
                      value={column}>
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
                onChange={(event) =>
                  changeOperator(filter, filterIndex, event)
                }>
                {Object.keys(Operator).map((key) => (
                  <MenuItem key={`operator-option-${index}-${key}`} value={key}>
                    {Operator[key as keyof typeof Operator]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                error={error ? true : false}
                helperText={error ? error : ''}
                key={`value-${index}-${filter.id}`}
                id={`value-${index}`}
                label="Value"
                variant="outlined"
                defaultValue={filter.value}
                onChange={(event) => changeValue(filter, filterIndex, event)}
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div onMouseEnter={() => addHover()} onMouseLeave={() => addLeave()}>
            <IconButton
              color="primary"
              aria-label="Add"
              component="span"
              size="large"
              onClick={() => {
                setPlaceholder(false);
                addCallback(filterIndex);
              }}>
              <AddIcon />
            </IconButton>
          </div>
          <IconButton
            color="warning"
            aria-label="Remove"
            component="span"
            size="large"
            onClick={() => removeCallback(filterIndex)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {placeholder && (
        <Box
          sx={{
            width: '100%',
          }}>
          <Skeleton variant="rectangular" height={50} />
        </Box>
      )}
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
