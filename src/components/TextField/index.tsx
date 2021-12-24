import * as React from 'react';
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

const TextField = ({
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
  if (value !== '' || isDisplayText) error = false

  return ( 
    <MUITextField 
      helperText={error ? "Обязательное поле":" "} label={label} 
      size="small" value={value} disabled={isDisplayText}
      multiline
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({type: actionType, value: event.target.value})} 
      required={required} 
      sx={{width: 320}} 
      error={error}
    />   
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

export default React.memo(TextField, areEqual);
