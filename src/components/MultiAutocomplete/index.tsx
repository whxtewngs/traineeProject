import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {createUseStyles} from 'react-jss';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import {primaryColor} from '../palette';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ruRU} from '@mui/material/locale';
import axios from 'axios';
import {useKeycloak} from '@react-keycloak/web';
import CircularProgress from '@mui/material/CircularProgress';
import TechBlock from "./TechBlock";

const useStyles = createUseStyles({
  container: {
    maxWidth: 320
  },
  TextFieldContainer: {
    display: ' flex',
    alignItems: 'end',
    paddingBottom: 24,
    gap: 8,
    width: 320
  },
  displayNone: {
    display: 'none'
  },
  block: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 24,
    gap: 10,
    padding: '8px 16px',
    border: `1px solid ${primaryColor}`,
    //backgroundColor: alpha(primaryColor, 0.25),
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    color: primaryColor,
    fontFamily: 'Roboto, sans-serif',
  },
  blockClear: {
    position: 'absolute',
    right: -10,
    top: -12,
    cursor: 'pointer',
  },
  blockContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12
  },
});

interface IProps {
  label: string
  valueArray: string[]
  actionTypeAdd: string
  actionTypeDelete: string
  dispatch: React.Dispatch<{ type: string; value: string; }>
  isDisplayText?: boolean
  url: string
}

function MultiAutocomlete(
  {
    label,
    valueArray,
    dispatch,
    actionTypeAdd,
    actionTypeDelete,
    isDisplayText,
    url
  }: IProps
) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly string[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
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

  const classes = useStyles();
  const createBlock = (element: string) => (
    <div className={classes.block} key={element}>
      <TechBlock
        element={element}
        dispatch={dispatch}
        actionTypeDelete={actionTypeDelete}
        isDisplayText={isDisplayText}
      />
    </div>
  );

  return (
    <ThemeProvider
      theme={(outerTheme) => createTheme(outerTheme, ruRU)}
    >
      <div className={classes.container}>
        <div className={classes.TextFieldContainer}>
          {isDisplayText && <span style={{
            fontWeight: 'bold',
            fontSize: 16,
            fontFamily: 'Roboto, sans-serif',
            color: '#878c96',
            marginLeft: 12
          }}>Технологии</span>}
          <Autocomplete
            className={isDisplayText ? classes.displayNone : undefined}
            size="small"
            open={open}
            disabled={isDisplayText}
            isOptionEqualToValue={(option, value) => option === value}
            options={options}
            loading={loading}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            sx={{width: 280}}
            freeSolo
            renderInput={
              (params) =>
                <TextField
                  {...params}
                  inputRef={inputRef}
                  label={label}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20}
                                                     sx={{marginRight: 4}}/> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />}
          />
          <IconButton onClick={
            () => {
              dispatch({type: actionTypeAdd, value: inputRef.current?.value ?? ''});
            }
          } color="primary" style={{display: isDisplayText ? 'none' : ''}}>
            <DoneIcon/>
          </IconButton>
        </div>
        <div className={classes.blockContainer}>
          {valueArray.map((element) => createBlock(element))}
        </div>
      </div>
    </ThemeProvider>
  );
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.valueArray.length === nextProps.valueArray.length
    &&
    prevProps.isDisplayText === nextProps.isDisplayText
  ) return true

  return false
}

export default React.memo(MultiAutocomlete, areEqual);