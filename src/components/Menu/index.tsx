import { createUseStyles } from 'react-jss';
import * as React from 'react';
import {
  Link
} from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { NavLink } from 'react-router-dom';
import MenuFilters from '../MenuFilters';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useKeycloak } from "@react-keycloak/web";
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {RenderOnRole} from '../AuthProvider'

const useStyles = createUseStyles({
  menuContainer: {
    boxSizing: 'border-box',
    paddingTop: 40,
    //position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 304,
    minWidth: 304,
    minHeight: '100%',

    borderRadius: 4,
    //backgroundColor: '#122949',
    backgroundColor: '#161a27',
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
  },
  /* filtersItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 48,
  }, */
  link: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 40,
    gap: 8,
    paddingLeft: 48,
    boxSizing: 'border-box',
    textDecoration: 'none',
    color: '#b7bfc8',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'medium',
    borderLeft: '2px solid transparent',
    '&:hover': {
      color: '#fff'
    }
  },
  activeLink: {
    borderLeft: '2px solid white',
    color: '#fff',
    fontWeight: 'bold'
  },
  logo: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: 36,
    color: 'white',
  },
  row: {
    width: '100%',
    height: 1,
    backgroundColor: '#1f2936'
  },
  form: {
    backgroundColor: '#fff', 
    padding: 24
  },
  authIndicator: {
    display: 'flex',
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#b7bfc8',
    textDecoration: 'none',
  }
});

interface IProps {
  theme?: string
}

const Menu = (
  {
    theme
  }: IProps
) => {
  const { keycloak, initialized } = useKeycloak();
  const [user, setUser] = React.useState<Keycloak.KeycloakProfile>({firstName: '', lastName: ''});
  React.useEffect(
    () => {
      if (initialized && keycloak?.token) {
        keycloak.loadUserProfile()
          .then(user => setUser(user))
      }
    },
    [initialized]
  )
  const navigate = useNavigate()
  const classes = useStyles();
  const createLink = (to: string, icon: React.ReactElement, label: string) => {
    return (
    <NavLink to={to} className={
      (props: {
        isActive: boolean;
      }) => !props.isActive ? classes.link : `${classes.link} ${classes.activeLink}`
    }>
      {icon}
      {label}
    </NavLink>
    )
  }

  if (theme === 'projectCard') {
    return (
      <div className={classes.menuContainer} style={{justifyContent: 'space-between'}}>
        <NavLink to={'/table/all'} className={classes.link}><ArrowBackOutlinedIcon fontSize="small"/>К реестру проектов</NavLink>
        {
        /* keycloak?.authenticated &&
        <div className={classes.authIndicator} style={{marginBottom: 64}}>
          <Typography variant="h2" component="div" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <FaceIcon fontSize="small"/>
          </Typography>
        </div> */
        } 
      </div>
    )
  }
  
  return (
    <div className={classes.menuContainer}>
      <div className={classes.filters}>
          {createLink('/table/all',<HomeOutlinedIcon fontSize="small"/>, 'Все проекты')}

          {createLink('/table/active',<PageviewOutlinedIcon fontSize="small"/>, 'Активные')}

          {createLink('/table/archive', <BookmarkBorderIcon fontSize="small"/>, 'Архив')}

          {createLink('/table/draft', <ModeEditOutlineOutlinedIcon fontSize="small"/>, 'Черновики')}
      </div>
      <div className={classes.row} />
      <MenuFilters />
      {/* <RenderOnRole roles={['projectManagement']}> */}
        <NavLink to='/card/createNewCard' className={classes.link}>
            <AddBoxOutlinedIcon fontSize="small"/>
            Добавить проект
        </NavLink>
      {/* </RenderOnRole> */}
      {
      keycloak?.authenticated &&
        <div className={classes.authIndicator}>
          <Typography variant="h2" component="div" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <FaceIcon fontSize="small"/>
            {(user.firstName !== '' || user.firstName !== '') && `${user.firstName} ${user.lastName}`}
            <LogoutIcon
              sx={{cursor: 'pointer'}}
              onClick={
                () => {
                  keycloak.logout()
                  navigate('/login')
                }
              }
            />
          </Typography>
        </div>
      }  
    </div>   
  );
}

export default Menu;