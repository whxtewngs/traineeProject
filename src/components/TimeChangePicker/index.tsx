import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import ruLocale from 'date-fns/locale/ru';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  switchContainer: {
    width: 320,
  },
  icon: {
    marginRight: 8,
  }
});

interface IProps {
  isTimeChange: boolean
  dayEnd: string
  dayStart: string
  dispatch:  React.Dispatch<{ type: string; value: string; }>
  actionTypeSwitch: string
  actionTypeStartDay: string
  actionTypeEndDay: string
  isDisplayText?: boolean
  label: string
}

function TimeChangePicker(
  {
    isTimeChange,
    dayEnd,
    dayStart,
    dispatch,
    actionTypeSwitch,
    actionTypeStartDay,
    actionTypeEndDay,
    isDisplayText,
    label
  }: IProps
) {
  const classes =  useStyles();

  return (
    <FormGroup className={classes.switchContainer}>
      <FormControlLabel 
        sx={{marginLeft: 1}}
        control={
          !isDisplayText ? 
          <Switch
          checked={isTimeChange}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (isTimeChange) {
              dispatch({type: actionTypeStartDay, value: ''})
              dispatch({type: actionTypeStartDay, value: ''})
            }
            dispatch({type: actionTypeSwitch, value: ''})}
          }
          inputProps={{ 'aria-label': 'controlled' }}
          />
          : isTimeChange? 
          <CheckCircleOutlineOutlinedIcon className={classes.icon} fontSize="small" color="success"/> 
          : 
          <CancelOutlinedIcon className={classes.icon} fontSize="small" color="secondary"/>
        }
        label={<FormLabel>{label}</FormLabel>}
      />
      <div style={{display: isTimeChange ? 'block':'none'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <TimePicker
            label="Начало рабочего дня"
            value={dayStart === '' ? null : new Date(dayStart)}
            onChange={
              (date: Date | null) => {
                if (date !== null && (new Date(date)).toString() !== 'Invalid Date') {
                  dispatch({type: actionTypeStartDay, value: date.toISOString()})
                }
              }
            }
            disabled={isDisplayText}
            renderInput={(params) => <TextField {...params} size="small" 
            sx={{width: 240}}
            inputProps={{...params.inputProps, placeholder: "чч.мм"}}
            />}
          />
          <TimePicker
            label="Конец рабочего дня"
            value={dayEnd === '' ? null : new Date(dayEnd) }
            onChange={
              (date: Date | null) => {
                if (date !== null && (new Date(date)).toString() !== 'Invalid Date') {
                  dispatch({type: actionTypeEndDay, value: date.toISOString()})
                }
              }
            }
            disabled={isDisplayText}
            renderInput={(params) => <TextField {...params} size="small"
            sx={{width: 240}}
            inputProps={{...params.inputProps, placeholder: "чч.мм"}}
            />}
          />
        </LocalizationProvider>
      </div>
    </FormGroup>
  );
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.isTimeChange === nextProps.isTimeChange
    && 
    prevProps.dayStart === nextProps.dayStart
    && 
    prevProps.dayEnd === nextProps.dayEnd
    && 
    prevProps.isDisplayText === nextProps.isDisplayText
  ) return true

  return false
}

export default React.memo(TimeChangePicker, areEqual);