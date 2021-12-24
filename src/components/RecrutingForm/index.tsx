import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { alpha } from '@mui/material/styles';
import { primaryColor } from '../palette';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RecrutingFormItem from './RecrutingFormItem';
import { FormLabel } from '@mui/material';
import { 
 IRecruitingCardDto
} from '../../app/store'

const useStyles = createUseStyles({
  recrutingCard: {
    display: 'grid',
    placeContent: 'center'
  },
  recrutingBlock: {
    display: 'grid',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32
  },
  recrutingCardRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32
  },
  label: {
    gridColumn: '1 / span 3'
  },
});

interface IProps {
  isDisplayText: boolean
  state: IRecruitingCardDto
  dispatch:  React.Dispatch<{ type: string; value: any; }>
  error: boolean
}

export default function RecrutingForm({
  isDisplayText,
  state,
  dispatch,
  error
}: IProps
) {
  const classes = useStyles();

  const debounce = (callback: (event: React.ChangeEvent<HTMLInputElement>) => void, delay: number) => {
    let timeout: number;
  
    return function (event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay, event);
    }
  }

  return (
    <div className={classes.recrutingCard}>
      <div className={classes.recrutingBlock}>
      <FormLabel required className={classes.label}>Направлять резюме</FormLabel>
        <div className={classes.recrutingCardRow}>
          <TextField
            defaultValue={state.fullName}
            error={error && state.fullName === '' && !isDisplayText}
            helperText={error && state.fullName === '' && !isDisplayText ? "Обязательное поле" : " "}
            onChange={debounce((event: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'fullName', value: event.target.value}), 200)}
            placeholder="ФИО"
            sx={{width: 335}}
            size="small"
            disabled={isDisplayText}
          />

          <TextField
              defaultValue={state.email}
              error={error && state.email === '' && !isDisplayText}
              helperText={error && state.email === '' && !isDisplayText ? "Обязательное поле" : " "}
              onChange={debounce((event: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'email', value: event.target.value}), 200)}
              placeholder="Email"
              sx={{width: 240}}
              type='email'
              size="small"
              disabled={isDisplayText}
          />
          <TextField
              defaultValue={state.phoneNumber}
              error={error && state.phoneNumber === '' && !isDisplayText}
              helperText={error && state.phoneNumber === '' && !isDisplayText ? "Обязательное поле" : " "}
              sx={{width: 185}}
              onChange={debounce((event: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'phoneNumber', value: event.target.value}), 200)}
              type='tel'
              placeholder="Телефон"
              size="small"
              disabled={isDisplayText}
          />
        </div>
      </div>

      <RecrutingFormItem label={'Собеседования для разработчиков'} isDisplayText={isDisplayText} type="employeeD" typeAdd="newEmployeeD"
        state={state.employeeDListDtoList} dispatch={dispatch} fieldArray={['fullName', 'email', 'phoneNumber']} typeDelete="deleteEmployeeD"
        error={error}
      />

      <RecrutingFormItem label={'Собеседования для аналитиков'} isDisplayText={isDisplayText} type="employeeA" typeAdd="newEmployeeA"
        state={state.employeeAListDtoList} dispatch={dispatch} fieldArray={['fullAnalyticName', 'emailAnalytic', 'phoneAnalyticNumber']}
        typeDelete="deleteEmployeeA" error={error}
      />
    </div>  
  );
}