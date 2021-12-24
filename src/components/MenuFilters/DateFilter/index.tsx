import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

interface IProps {
  value: {from: number | null, to: number | null},
  dispatch: React.Dispatch<{ type: string; value: any;}>
  action: (from: number | null, to: number | null) => {type: string, value: {from: number | null, to: number | null}}
}

const DateFilter = (
  { 
    value,
    dispatch,
    action
  }: IProps
) => {
  const [from, setFrom] = useState<number | null>(value.from);
  const [to, setTo] = useState<number | null>(value.to);

  useEffect(
    () => {
      if (from !== null && to !== null){
        dispatch(action(from, to))
      } else if (from !== null) {
        dispatch(action(from, null))
      } else if (to !== null) {
        dispatch(action(null, to))
      }
    },
    [from, to]
  );
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <DatePicker
        mask={'__.__.____'}
        label="От"
        value={from === null ? from : new Date(from)}
        views={['day']}
        onChange={
          (date: React.ChangeEvent<HTMLInputElement> & Date | null) => {
            if (date !== null) {
              setFrom(date.getTime())
            } 
          }
        }
        renderInput={(params) => <TextField {...params}  size="small"
        onFocus={() => {console.log('focus')}} 
        sx={{width: 168,
          '& .MuiOutlinedInput-root.Mui-focused fieldset':{
            boxShadow: 'none',
            border: 'none'
          },
          '& .MuiOutlinedInput-root.MuiInputBase-root': {
            backgroundColor: 'white'
          },
        }} 
        InputLabelProps={{sx: {fontSize: 14}}}
        inputProps={{...params.inputProps, placeholder: "ДД.ММ.ГГГГ"}}
        />}
      />
      <DatePicker
        mask={'__.__.____'}
        views={['day']}
        label="До"
        value={to === null ? to : new Date(to)}
        onChange={
          (date: React.ChangeEvent<HTMLInputElement> & Date | null) => {
            if (date !== null) {
              setTo(date.getTime())
            } 
          }
        }
        renderInput={(params) => <TextField {...params}  size="small"
        onFocus={() => {console.log('focus')}} 
        sx={{width: 168,
          '& .MuiOutlinedInput-root.Mui-focused fieldset':{
            boxShadow: 'none',
            border: 'none'
          },
          '& .MuiOutlinedInput-root.MuiInputBase-root': {
            backgroundColor: 'white'
          },
        }} 
        InputLabelProps={{sx: {fontSize: 14}}}
        inputProps={{...params.inputProps, placeholder: "ДД.ММ.ГГГГ"}}
        />}
      /> 
    </LocalizationProvider>
  )
}

export default DateFilter;
