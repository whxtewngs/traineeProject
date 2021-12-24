import { createUseStyles } from 'react-jss';
import ConnectedProjectCard from '../ConnectedProjectCard';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ConnectedTableOfContent from '../TableOfContent';
import { useState } from 'react';
import { LoginPage, RequireRoute } from '../AuthProvider';
import Menu from '../Menu';
import {GET_ALL_PROJECTS_URL} from '../../app/urls'

const useStyles = createUseStyles({
  cardContainer: {
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    minHeight: 'calc(100% - 28px)',
   //marginLeft: 320
  },
  tableContainer: {
    backgroundColor: '#F1F2F6',   
    width: '100%',
    //marginLeft: 329, 
    minHeight: 'calc(100vh - 16px)'
  },
  header: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Roboto, sans-serif',
    color: '#161a27',
    margin: 0,
    marginBottom: 8
  }
});

const Main = () => {
  const classes = useStyles();
  
return (
    <Routes>
      <Route path="/card/:projectId" element={
        <>
          <Menu theme="projectCard"/>
          <main className={classes.cardContainer}>
            <ConnectedProjectCard />
          </main>
        </>   
      }/>
      <Route path="/table/:projectsStatus" element={
        //<RequireRoute>
          <>
            <Menu />
            <main className={classes.tableContainer}>
              <ConnectedTableOfContent url={GET_ALL_PROJECTS_URL}/>
            </main>
          </>
        //</RequireRoute>
      }/>
      <Route
        path="*"
        element={<Navigate to="/table/all" />}
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes> 
);}

export default Main;