import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '@mui/material';
import { FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

const useStyles = createUseStyles({
  container: {
    display: 'grid',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32
  },
  item: {
    display: 'flex',
    gap: 16,
  }
})

export default function RecrutingFormItem(
  {
    label,
    isDisplayText,
    state, 
    dispatch,
    fieldArray,
    type,
    typeAdd,
    typeDelete,
    error
  }: {
    label: string
    isDisplayText: boolean
    state: {[key: string]: string}[]
    dispatch: React.Dispatch<{ type: string; value: any; id?: number; field?: string}>
    fieldArray: string[]
    type: string
    typeAdd: string
    typeDelete: string
    error: boolean
  }
) {
  const [count, setCount] = React.useState(0);
  const classes = useStyles();

  const renderItem = (
    id: number, 
    object: {[key:string]: string},
    isDisplayText: boolean, 
    fieldArray: string[]
    ) => {
    return(
      <>
        <TextField
          value={object[fieldArray[0]]}
          error={error && object[fieldArray[0]] === '' && !isDisplayText}
          placeholder="ФИО"
          size="small"
          sx={{width: 335}}
          helperText={error && object[fieldArray[0]] === '' && !isDisplayText ? "Обязательное поле" : " "}
          disabled={isDisplayText}
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({type: type, value: event.target.value, id, field: fieldArray[0]})
            }
          }
        />
        <TextField
          value={object[fieldArray[1]]}
          error={error && object[fieldArray[1]] === '' && !isDisplayText}
          helperText={error && object[fieldArray[1]] === '' && !isDisplayText ? "Обязательное поле" : " "}
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({type: type, value: event.target.value, id, field: fieldArray[1]})
            }
          }
          placeholder="Email"
          size="small"
          type='email'
          sx={{width: 240}}
          disabled={isDisplayText}
        />
        <TextField
          value={object[fieldArray[2]]}
          error={error && object[fieldArray[2]] === '' && !isDisplayText}
          helperText={error && object[fieldArray[2]] === '' && !isDisplayText ? "Обязательное поле" : " "}
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({type: type, value: event.target.value, id, field: fieldArray[2]})
            }
          }
          placeholder="Телефон"
          size="small"
          type='tel'
          sx={{width: 185}}
          disabled={isDisplayText}
        />

        <Button 
          variant="text" fullWidth={false} 
          sx={{width: 120, display: isDisplayText ? 'none':'', maxHeight: 40}} onClick={
            () => {  
              dispatch({type: typeDelete, value: id})
            }
          }
          color="secondary"
        >
          Удалить
        </Button>
      </>
    )
  }

  return (
    <div className={classes.container}>
      <FormLabel required>{label}</FormLabel>
      {state.map(
        (value, index) => {
          return (
          <div key={ index} className={classes.item}>
            {renderItem(index, value, isDisplayText, fieldArray)}
          </div>
          )
        }
      )}
      <Button variant="text" fullWidth={false} sx={{width: 120, display: isDisplayText ? 'none':''}} 
        onClick={
          () => {
            dispatch({type: typeAdd, value: ''})
          }
        }
      >
        Добавить
      </Button>
    </div>
  )
}