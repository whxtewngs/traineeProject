import * as React from 'react';
import TextField from '@mui/material/TextField';

interface IProps {
  value: string,
  dispatch: React.Dispatch<{ type: string; value: string; }>
  action: (value: string) => {type: string, value: string}
}

const SearchField = (
  {
    value,
    dispatch,
    action
  } : IProps
) => {

return(
  <TextField aria-label="Demo input" size="small" sx={{width: 168,
    '& .MuiOutlinedInput-root.Mui-focused fieldset':{
      boxShadow: 'none',
      border: 'none'
    },
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      backgroundColor: 'white'
    },
    }}
    autoFocus
    value={value}
    onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(action(event.target.value))
        }
    }
  />
)
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  if (
    prevProps.value === nextProps.value 
  ) return true

  return false
}

export default React.memo(SearchField, areEqual)
