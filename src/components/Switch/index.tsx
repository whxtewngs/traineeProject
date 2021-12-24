import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import MUISwitch from '@mui/material/Switch';
import { createUseStyles } from 'react-jss';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const useStyles = createUseStyles({
  switchContainer: {
    width: 320,
  },
  icon: {
    marginRight: 8,
  }
});

interface IProps {
  label:string
  checked: boolean
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  required?: boolean
  isDisplayText?: boolean
}

const Switch = (
  {
    label,
    checked,
    dispatch,
    actionType,
    required,
    isDisplayText
  }: 
  {
    label:string
    checked: boolean
    dispatch: React.Dispatch<{ type: string; value: string; }>
    actionType: string
    required?: boolean
    isDisplayText?: boolean
  }
) => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.switchContainer} style={{marginLeft: isDisplayText ? 48 : 0, marginBottom: isDisplayText ? 8 : 0,
      marginTop: isDisplayText ? 6 : 0
    }}>
      <FormControlLabel 
        control={
          !isDisplayText ? 
          <MUISwitch
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({type: actionType, value: ''})}
          }
          inputProps={{ 'aria-label': 'controlled' }}
          />
          : checked ? 
          <CheckCircleOutlineOutlinedIcon className={classes.icon} fontSize="small" color="success"/> 
          : 
          <CancelOutlinedIcon className={classes.icon} fontSize="small" color="secondary"/>
        }
        label={<FormLabel required={required}
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16,
          }}
          >
          {label}
          </FormLabel>
        }
      />
    </FormGroup>
  );
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.checked === nextProps.checked 
    && 
    prevProps.isDisplayText === nextProps.isDisplayText
  ) return true

  return false
}

export default React.memo(Switch, areEqual);