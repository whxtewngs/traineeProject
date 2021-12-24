import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
  label: string
  value: string
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  selectList: string[]
  error?: boolean
  required?: boolean
  isDisplayText?: boolean
}

function Select(
  {
    label, 
    value,
    dispatch,
    actionType,
    selectList,
    error,
    required,
    isDisplayText
    }: {
    label: string
    value: string
    dispatch: React.Dispatch<{ type: string; value: string; }>
    actionType: string
    selectList: string[]
    error?: boolean
    required?: boolean
    isDisplayText?: boolean
  }
) {
  if (value !== '' || isDisplayText) error = false

  return (
    <FormControl fullWidth sx={{width: 320}}>
      <InputLabel  
        required={required}
        error={error}
      >
        {label}
      </InputLabel> 
      <MUISelect
        error={error}
        disabled={isDisplayText}
        size="small"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={
          (event: SelectChangeEvent) => {dispatch({type: actionType, value: event.target.value})}
        }
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {selectList.map((element) => <MenuItem value={element} key={element}>{element}</MenuItem>)}
      </MUISelect>
      <FormHelperText error={error}>{error ? "Обязательное поле" : " "}</FormHelperText>
    </FormControl>
  );
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.value === nextProps.value 
    && 
    prevProps.isDisplayText === nextProps.isDisplayText
    &&
    prevProps.error === nextProps.error
  ) return true

  return false
}

export default React.memo(Select, areEqual);