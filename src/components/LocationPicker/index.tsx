import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from './LocationAutocomplete';

const sxClasses = {
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
    color: '#878c96'
  },
}

function LocationPicker(
  {
    isOffice,
    officeLocation,
    dispatch,
    actionTypeRadio,
    actionTypeAutocomlete,
    isDisplayText,
    error
  }:{
    isOffice: boolean
    officeLocation: string
    dispatch:  React.Dispatch<{ type: string; value: string; }>
    actionTypeRadio: string
    actionTypeAutocomlete: string
    isDisplayText?: boolean
    error?: boolean
  }
) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" sx={{...sxClasses.label}} required={!isDisplayText}>
        Локация
        <span style={{
          fontWeight: 'bold',
          fontSize: 16,
          fontFamily: 'Roboto, sans-serif',
          color: '#878c96',
        }}>{!isDisplayText ? '' : isOffice ? ' - Офиc' : ' - Удаленно'}</span>
      </FormLabel>
      <RadioGroup row aria-label="gender" 
        value={isOffice ? 'office' : 'remote'}
        onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => {
            isOffice && dispatch({type: actionTypeAutocomlete, value: ''})
            dispatch({type: actionTypeRadio, value: ''})
          }
        }
        name="row-radio-buttons-group"
      >
        {!isDisplayText && <FormControlLabel value="office" control={<Radio />} label="Офис" /> }
        {!isDisplayText && <FormControlLabel value="remote" control={<Radio />} label="Удаленно" /> }
      </RadioGroup>
      {
        isOffice && 
          <div style={{marginTop: 8}}>
            <Autocomplete label="Место расположения" styleProps={{fontSize: 14}}  isDisplayText={ isDisplayText}
              value={officeLocation} dispatch={dispatch} actionType={actionTypeAutocomlete} error={error}/>
          </div>
      }
    </FormControl>
  );
}

export default LocationPicker;