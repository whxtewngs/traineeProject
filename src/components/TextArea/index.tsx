import React from 'react';
import MUITextField from '@mui/material/TextField';

interface IProps {
  label: string
  rows: number
  value: string
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  error?: boolean
  required?: boolean
  isDisplayText?: boolean
}

export const TextArea = ({
  label,
  rows,
  value,
  dispatch,
  actionType,
  error,
  required,
  isDisplayText
  }: {
  label: string,
  rows: number
  value: string 
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  error?:boolean
  required?: boolean
  isDisplayText?: boolean
}) => {  
  if (value !== '' || isDisplayText) error = false

  return ( 
    <MUITextField 
      variant="outlined" helperText={error ? "Обязательное поле":" "} label={label}
      size="small" value={value} disabled={isDisplayText}
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({type: actionType, value: event.target.value})}
      } 
      required={required} fullWidth error={error}
      multiline 
      minRows={rows}
      maxRows={Infinity}
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

export default React.memo(TextArea, areEqual);