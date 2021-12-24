import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web'

interface IProps {
  handleSubmit: () => void
}

export default function LoginModal(
  {
    handleSubmit
  } : IProps
) {
  const { keycloak } = useKeycloak()

  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>Добро пожаловать!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для доступа к реестру проектов необходима авторизация.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingRight: 3}}>
          <Button onClick={() => {
            keycloak?.login()
          } }>Войти</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

