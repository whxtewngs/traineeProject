import * as React from 'react';
import TextField from '@mui/material/TextField';
import MUIAutocomplete from '@mui/material/Autocomplete';

interface IProps {
  label: string 
  styleProps?: {fontSize: number}
  value: string | null
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  isDisplayText?: boolean
}

const array = [
  'г. Москва, ул. Складочная, д.3, стр. 1', 
  'г. Ульяновск, Комсомольский пер., 22',
  'г. Уфа, ул. Менделеева, д. 130',
  'г. Барнаул, ул. Взлетная д.33',
  'г. Нижний Новгород, ул. Максима Горького, д. 117',
  'г. Пермь, ул. Куйбышева, 95б',
  'г. Санкт-Петербург, ул. Английская набережная, д. 70'
];

function Autocomplete({
  label, 
  value,
  styleProps,
  dispatch,
  actionType,
  isDisplayText,
  error
  } : {
  label: string 
  styleProps?: {fontSize: number} 
  value: string | null
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  isDisplayText?: boolean
  error?: boolean
}) {
  return (
    <MUIAutocomplete
      size="small"
      id="free-solo-demo"
      sx={{width: 320}}
      value= {value}
      disabled={isDisplayText}
      onChange={
        (event: any, newValue: string | null) => {
          dispatch({type: actionType, value: newValue ?? ''})
        }
      }
      freeSolo
      options={array.map((option) => option)} 
      renderInput={
        (params) => <TextField {...params} value= {value} label={label} 
      multiline
      required={!isDisplayText}
      error={error && !isDisplayText && !value} 
      helperText={error && !isDisplayText && !value ? "Обязательное поле":" "}
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({type: actionType, value: event.target.value})
        }
      }
      InputLabelProps={{ sx:{...styleProps} }}
      />}
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

export default React.memo(Autocomplete, areEqual);