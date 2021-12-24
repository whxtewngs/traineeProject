import * as React from 'react';
import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MUIDatePicker from '@mui/lab/DatePicker';

interface IProps {
  label: string 
  value: string
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  isDisplayText?: boolean
  minDate?: string
  maxDate?: string
}

function DatePicker(
  {
    label, 
    value,
    dispatch,
    actionType,
    isDisplayText,
    minDate,
    maxDate
    }: IProps
) {
  const [errorValid, setErrorValid] = React.useState(false);
  const [errorMaxDate, setErrorMaxDate] = React.useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <MUIDatePicker
        mask={'__.__.____'}
        views={['day']}
        label={label}
        value={value === '' ? null : new Date(value)}
        disabled={isDisplayText}
        onChange={
          (date: React.ChangeEvent<HTMLInputElement> & Date | null) => {
            if (date !== null && (new Date(date)).toString() !== 'Invalid Date' && String(date.getFullYear()).length === 4) {
              if (date <= new Date(maxDate ?? '2700.01.01')) {
                dispatch({type: actionType, value: date.toISOString()})
                setErrorMaxDate(false);
              } else {
                setErrorMaxDate(true);
              }
              setErrorValid(false);
            } else {
              setErrorValid(true);
            }
          }    
        }
        renderInput={(params) => <TextField {...params}  size="small"
        error={errorValid || errorMaxDate}
        //onFocus={() => {console.log('focus')}} 
        sx={{width: 320}} 
        inputProps={{...params.inputProps, placeholder: "ДД.ММ.ГГГГ"}}
        helperText={
          (errorValid && !isDisplayText) ? "Неверный формат даты" : 
          (errorMaxDate && !isDisplayText) ? "Дата выхода команды на проект не может быть позже срока завершения проекта" : 
          " "
        }
        />}
      />
    </LocalizationProvider>
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

export default React.memo(DatePicker, areEqual);
