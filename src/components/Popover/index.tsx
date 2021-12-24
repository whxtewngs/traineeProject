import * as React from 'react';
import {createUseStyles} from 'react-jss';
import {useKeycloak} from '@react-keycloak/web';

import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {
  postStatusInfo,
  postDeleteProject
} from '../../app/thunkActions';
import {DELETE_PROJECT_URL, POST_PROJECT_STATUS_URL} from '../../app/urls'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = createUseStyles({
  popoverItem: {
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f6f8f9'
    }
  }
})

interface IProps {
  projectId: number
  projectStatus: string
  setWillDeleteProject: React.Dispatch<React.SetStateAction<number>>
  setWillStatusChanged: React.Dispatch<React.SetStateAction<{ id: number, status: string }>>
}

function ConnectedBasicPopover(
  {
    projectId,
    projectStatus,
    setWillDeleteProject,
    setWillStatusChanged
  }
    : IProps
) {
  const postingInfo = useAppSelector(state => state.postingInfo);
  const reduxDispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const {keycloak} = useKeycloak();
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {
          projectStatus === 'Активна' ?
            <div className={classes.popoverItem} onClick={
              () => {
                reduxDispatch(postStatusInfo(POST_PROJECT_STATUS_URL, keycloak?.token ?? '', 'В архиве', projectId));
                setWillStatusChanged({id: projectId, status: 'В архиве'})
              }
            }>
              {
                postingInfo.statusInfo ?
                  <CircularProgress size={24}/> :
                  <ArchiveIcon fontSize="small" color="secondary"/>
              }
              <Typography sx={{p: 2}}>Поместить в архив</Typography>
            </div>
            : projectStatus === 'В архиве' ?
              <div className={classes.popoverItem} onClick={
                () => {
                  reduxDispatch(postStatusInfo(POST_PROJECT_STATUS_URL, keycloak?.token ?? '', 'Активна', projectId));
                  setWillStatusChanged({id: projectId, status: 'Активна'})
                }
              }>
                {
                  postingInfo.statusInfo ?
                    <CircularProgress size={24}/> :
                    <UnarchiveIcon fontSize="small" color="success"/>
                }
                <Typography sx={{p: 2}}>Убрать из архива</Typography>
              </div>
              :
              null
        }
        <div className={classes.popoverItem} onClick={
          () => {
            reduxDispatch(postDeleteProject(`${DELETE_PROJECT_URL}${projectId}`, keycloak?.token ?? ''));
            setWillDeleteProject(projectId);
          }
        }>
          {postingInfo.deleteProject ? <CircularProgress size={24}/> : <DeleteIcon fontSize="small"/>}
          <Typography sx={{p: 2}}>Удалить</Typography>
        </div>
      </Popover>
    </div>
  );
}

export default ConnectedBasicPopover;