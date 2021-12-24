import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface IProps {
  onClickAgree?: () => void
  onClickCancel?: () => void
  validationCheck?: () => boolean
  children: JSX.Element
  alertText: React.ReactElement<any, any>
  cancelText: string
  agreeText: string
}

export default function AlertDialog(
  {
    onClickAgree,
    onClickCancel,
    validationCheck,
    children,
    alertText,
    cancelText,
    agreeText
  }: IProps
) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={
        () => {
          if (validationCheck) {
            if(!validationCheck()) {
              handleClickOpen()
            } else {
              onClickAgree?.()
            }
          } else {
            handleClickOpen()
          }  
      }}>
        {children }
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Предупреждение!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => {
            onClickCancel?.()
            handleClose()
          }}>{cancelText}</Button>
          <Button color="success" onClick={() => {
            onClickAgree?.()
            handleClose()
          }} autoFocus>
           {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}