import React from 'react';
import MUITextField from '@mui/material/TextField';

interface IProps {
  label: string
  valueArray: string[]
  error?: boolean
  required?: boolean
  isDisplayText?: boolean
}

const sumArray = (array: string[]) => {
  return array.reduce((previosValue, currentValue) => String(+previosValue + +currentValue), '0');
}

const SumNumberField = ({
  label, 
  error,
  valueArray,
  required, 
  isDisplayText
  }: {
  label: string
  valueArray: string[]
  error?: boolean
  required?: boolean
  isDisplayText?: boolean
}) => { 
  const sum = sumArray(valueArray);

  return ( 
    <MUITextField 
      id="outlined-basic"  helperText={error ? "Обязательное поле":""} label={label}
      size="small" value={sum} required={required} sx={{
        '& .MuiOutlinedInput-root': {
          width: 60,
        },
        '& .MuiInputLabel-root': {
          fontSize: 14,
          minWidth: 220
        }
      }} 
      error={error} 
      disabled={isDisplayText}
      inputProps={{ inputMode: 'numeric', sx:{width: 30}}} 
    />  
  ); 
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    sumArray(prevProps.valueArray) === sumArray(nextProps.valueArray)
    && 
    prevProps.isDisplayText === nextProps.isDisplayText
  ) return true

  return false
}

export default React.memo(SumNumberField, areEqual);  