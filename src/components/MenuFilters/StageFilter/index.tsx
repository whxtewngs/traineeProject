import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
  value: string,
  dispatch: React.Dispatch<{ type: string; value: string; }>
  action: (value: string) => {type: string, value: string}
}

const StageFilter = (
  {
    value,
    dispatch,
    action
  } : IProps
) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      value={value}
      size="small"
      label="Age"
      onChange={(event: SelectChangeEvent) => {
          dispatch(action(event.target.value))
        }
      }
      sx={{
        width: 168, 
        backgroundColor: 'white',
        '&.MuiOutlinedInput-root.Mui-focused fieldset':{
          boxShadow: 'none',
          border: 'none'
        },
      }}
    >
      <MenuItem value={'Инициация'}>Инициация</MenuItem>
      <MenuItem value={'Начало'}>Начало</MenuItem>
      <MenuItem value={'Середина'}>Середина</MenuItem>
      <MenuItem value={'Завершение'}>Завершение</MenuItem>
    </Select>
  )
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.value === nextProps.value 
  ) return true

  return false
}

export default React.memo(StageFilter, areEqual);