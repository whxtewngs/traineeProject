import Menu from './components/Menu';
import Main from './components/Main';
import TableOfContent from './components/TableOfContent';

import { createUseStyles } from 'react-jss';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 16,
  }
})

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Main />
    </div> 
  );
}

export default App;