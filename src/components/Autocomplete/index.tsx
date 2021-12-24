import * as React from 'react';
import TextField from '@mui/material/TextField';
import MUIAutocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ruRU} from '@mui/material/locale';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

interface IProps {
  label: string 
  styleProps?: {fontSize: number}
  value: string | null
  dispatch: React.Dispatch<{ type: string; value: string; }>
  actionType: string
  isDisplayText?: boolean
  url: string
  error?: boolean
  required?: boolean
}

function Autocomplete({
  label, 
  value,
  styleProps,
  dispatch,
  actionType,
  isDisplayText,
  error,
  required,
  url
  } : IProps
) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly string[]>([]);
  const loading = open && options.length === 0;
  const {keycloak} = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let response = await axios.get<string[]>(url,
        {
          /*headers: {
            'Authorization': 'Bearer ' + kcToken,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
          }*/
        } 
      )

      if (active && Array.isArray(response.data)) {
        setOptions([...response.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  if (value !== '' || isDisplayText) error = false

  return (
    <ThemeProvider
        theme={(outerTheme) => createTheme(outerTheme, ruRU)}
      >
      <MUIAutocomplete
        size="small"
        id="free-solo-demo"
        sx={{width: 320}}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value= {value}
        disabled={isDisplayText}
        isOptionEqualToValue={(option, value) => option === value}
        options={options}
        loading={loading}
        onChange={
          (event: any, newValue: string | null) => {
            dispatch({type: actionType, value: newValue ?? ''})
          }
        }
        freeSolo
        renderInput={(params) => 
        <TextField {...params} value= {value} 
          label={label} error={error} 
          helperText={error ? "Обязательное поле":" "}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} sx={{marginRight: 4}}/> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({type: actionType, value: event.target.value})
            }
          }
          required={required}
          InputLabelProps={{ sx:{...styleProps} }}
        />}
      />
    </ThemeProvider>
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

export default React.memo(Autocomplete, areEqual);
