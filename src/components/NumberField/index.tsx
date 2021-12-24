import React from 'react';
import MUITextField from '@mui/material/TextField';

interface IProps {
  label: string
  value: string
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  error?: boolean
  required?: boolean
  isDisplayText?: boolean
}

const NumberField = ({
  label, 
  value,
  dispatch,
  actionType,
  error,
  required,
  isDisplayText
  }: {
  label: string
  value: string
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  error?: boolean
  required?: boolean
  isDisplayText?: boolean
}) => { 
  return ( 
    <MUITextField 
      id="outlined-basic"  helperText={error ? "Обязательное поле":""} label={label}
      size="small" value={value} onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          if (Number.isFinite(+event.target.value)) dispatch({type: actionType, value: event.target.value});
        }
      } required={required} sx={{
        '& .MuiOutlinedInput-root': {
          width: 60,
        },
        '& .MuiInputLabel-root': {
          fontSize: 14,
          minWidth: 220,
        },
      }} 
      error={error} 
      disabled={isDisplayText}
      inputProps={{ inputMode: 'numeric', sx:{width: 30}}} 
    />  

  ); 
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.value === nextProps.value 
    && 
    prevProps.isDisplayText === nextProps.isDisplayText
  ) return true

  return false
}

export default React.memo(NumberField, areEqual);