import {useKeycloak} from "@react-keycloak/web";
import {CircularProgress} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import LoginModal from "../LoginModal";

export function RequireRoute({children}: { children: JSX.Element }) {
  const {keycloak, initialized} = useKeycloak();
  let location = useLocation();

  if (!initialized) {
    return (
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={true}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    )
  }

  if (!keycloak.authenticated) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return children;
}

export function RenderOnRole({children, roles}: { children: JSX.Element, roles: string[] }) {
  const {keycloak} = useKeycloak();

  const isAutherized = (roles: string[]) => {
    if (keycloak && roles) {
      return roles.some(r => {
        const realm = keycloak.hasRealmRole(r);
        const resource = keycloak.hasResourceRole(r);
        return realm || resource;
      });
    }
    return false;
  }

  return children;//isAutherized(roles) ? children : null
}

export function LoginPage() {
  let location = useLocation();
  const {keycloak, initialized} = useKeycloak();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit() {
    keycloak.login();
  }

  return (
    keycloak.authenticated ? (
        <Navigate to={from}/>
      ) :
      (
        <div>
          <LoginModal handleSubmit={handleSubmit}/>
        </div>
      )
  );
}