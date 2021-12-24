import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createUseStyles } from 'react-jss';
import FormHelperText from '@mui/material/FormHelperText';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Typography } from '@mui/material';

const useStyles = createUseStyles({
  'RadioContainer': {
    display: 'grid',
    gap: 16,
  },
  'itemContainer': {
    display: 'grid',
    gap: 16,
    marginTop: 16,
    paddingLeft: 32
  },
  'item': {
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'medium'
  },
  radioLine: {
    display: 'flex',
    alignItems: 'center'
  },
  radioGroup: {
    flexGrow: 1
  }
});

const sxClasses = {
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
    color: '#878c96'
  },
}

interface IProps {
  label:string
  arrayOfTypes: string[]
  dispatch: React.Dispatch<{ type: string; value: string; index: number; }>
  actionType: string
  error?: boolean
  isDisplayText?: boolean
  required?: boolean
}


function RadioButtonsGroup({
  label,
  arrayOfTypes,
  dispatch,
  error,
  actionType,
  isDisplayText,
  required
  }:{
  label:string
  arrayOfTypes: string[]
  dispatch: React.Dispatch<{ type: string; value: string; index: number; }>
  error?: boolean
  actionType: string
  isDisplayText?: boolean
  required?: boolean
}) {
  const classes = useStyles();
  if (arrayOfTypes.every((value) => value !== '') || isDisplayText) error = false;

  return (
    <FormControl component="fieldset"
      sx={{
        width: 320,
      }}
      >
      <FormLabel component="legend" 
        sx={{
          ...sxClasses.label, 
          transform: isDisplayText ? 'translate(13px)' : '',
          '&.Mui-focused': {
            color: isDisplayText ? '#878c96': ''
          }
        }} 
        error={error}
        required={required}>
        {label}
      </FormLabel>
      {isDisplayText ? 
      <div>
        <ul className={classes.itemContainer}>
          {arrayOfTypes[0] && <li className={classes.item}>{arrayOfTypes[0]}</li>}
          {arrayOfTypes[1] && <li className={classes.item}>{arrayOfTypes[1]}</li>}
          {arrayOfTypes[2] && <li className={classes.item}>{arrayOfTypes[2]}</li>}
          {arrayOfTypes[3] && <li className={classes.item}>{arrayOfTypes[3]}</li>}
        </ul>
      </div>
      :
      <div className={classes.RadioContainer}>
        <div className={classes.radioLine}>
          <RadioGroup className={classes.radioGroup}
            row
            sx={{
              display: 'grid',
              gridTemplateColumns: '50% 50%'
            }}
            value={arrayOfTypes[0]}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({type: actionType, value: (event.target as HTMLInputElement).value, index: 0})
              }
            }
          >
            <FormControlLabel value="Т&М" control={<Radio size="small" />} label="Т&М" />
            <FormControlLabel value="Фикс" control={<Radio size="small" />} label="Фикс" />
          </RadioGroup>
          <Tooltip title={<span>ТМ - оплата проекта по времени <br/> Фикс - фиксированная оплата проекта</span>}    
          >
            <Typography variant="h3"><HelpOutlineOutlinedIcon fontSize="small"/></Typography>
          </Tooltip>
       </div>
       <div className={classes.radioLine}>
          <RadioGroup className={classes.radioGroup}
            row
            value={arrayOfTypes[1]}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({type: actionType, value: (event.target as HTMLInputElement).value, index: 1})
              }
            }
            sx={{
              display: 'grid',
              gridTemplateColumns: '50% 50%'
            }}
          >
            <FormControlLabel value="ПО" control={<Radio size="small" />} label="ПО" />
            <FormControlLabel value="ПАК" control={<Radio size="small" />} label="ПАК" />
          </RadioGroup>
          <Tooltip title={
            <span>ПО – разработка программного обеспечения <br/> 
            ПАК – разработка ПО с предоставлением программно-аппаратного комплекса</span>
          }    
          >
            <Typography variant="h3"><HelpOutlineOutlinedIcon fontSize="small"/></Typography>
          </Tooltip>
        </div>
        <div className={classes.radioLine}>
          <RadioGroup className={classes.radioGroup}
            row
            value={arrayOfTypes[2]}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({type: actionType, value: (event.target as HTMLInputElement).value, index: 2})
              }
            }
            sx={{
              display: 'grid',
              gridTemplateColumns: '50% 50%'
            }}
          >
            <FormControlLabel value="Разработка с нуля" control={<Radio size="small" />} label="Разработка с нуля" />
            <FormControlLabel value="Модернизация системы" control={<Radio size="small" />} label="Модернизация системы" />
          </RadioGroup>
          <Tooltip title={
            <span>Разработка с нуля – разработка нового продукта<br/> 
            Модернизация – модернизация существующего продукта</span>
          }    
          >
            <Typography variant="h3"><HelpOutlineOutlinedIcon fontSize="small"/></Typography>
          </Tooltip>
        </div>
        <div className={classes.radioLine}>
          <RadioGroup className={classes.radioGroup}
            row
            value={arrayOfTypes[3]}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({type: actionType, value: (event.target as HTMLInputElement).value, index: 3})
              }
            }
            sx={{
              display: 'grid',
              gridTemplateColumns: '50% 50%'
            }}
          >
            <FormControlLabel value="MVP" control={<Radio size="small" />} label="MVP" />
            <FormControlLabel value="Полный функционал" control={<Radio size="small" />} label="Полный функционал" />
          </RadioGroup>
          <Tooltip title={
            <span>MVP – минимально жизнеспособный продукт <br/> 
            Полный функционал – реализация полного функционала продукта</span>
          }    
          >
            <Typography variant="h3"><HelpOutlineOutlinedIcon fontSize="small"/></Typography>
          </Tooltip>
        </div>
      </div>
      }
      <FormHelperText error={error}>{error ? "Обязательное поле" : " "}</FormHelperText>
    </FormControl>
  );
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.arrayOfTypes.every((prevValue, index) => prevValue === nextProps.arrayOfTypes[index])
    && 
    prevProps.isDisplayText === nextProps.isDisplayText
    &&
    prevProps.error === nextProps.error
  ) return true

  return false
}

export default React.memo(RadioButtonsGroup, areEqual);