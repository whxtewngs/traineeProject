import {createUseStyles} from 'react-jss';
import ProjectCard from '../ProjectCard';
import {IProjectInfo} from '../../app/store';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {useLayoutEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GET_PROJECT_INFO_URL} from '../../app/urls';
import Skeleton from '@mui/material/Skeleton';
import {TPostingInfo} from '../../app/reducers';
import {
  fetchProjectInfo,
} from '../../app/thunkActions';
import {
  resetProjectInfo
} from '../../app/actionCreators';


const useStyles = createUseStyles({
  cardContainer: {
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    minHeight: 'calc(100vh - 16px)'
  },
  firstRow: {
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Roboto, sans-serif',
    color: '#161a27',
    margin: 0,
    marginBottom: 8
  },
  mainSkeleton: {
    padding: '72px 24px',
    display: 'grid',
    gridTemplateColumns: '400px 1fr 400px',
    gap: 40,
    placeItems: 'center'
  },
});

interface IProps {
  initialState: IProjectInfo
  onChange: (content: IProjectInfo) => void
  fetchingProjectInfo: (url: string) => void
  postProjectInfo: (url: string, kcToken: string) => void
  deleteProject: (url: string, kcToken: string) => void
  postStatusInfo: (url: string, kcToken: string, status: string, id: number) => void
  resetProjectInfo: () => void
  isFetch: boolean
  postingInfo: TPostingInfo
  newId: null | number
  resetId: () => void
  showDeleteAlert: () => void
  hideDeleteAlert: () => void
  networkError: boolean,
  setNetworkError: (value: boolean) => void
  hideStatusAlert: () => void
}

const ConnectedProjectCard = () => {
  const isFetch = useAppSelector(state => state.projectInfoFetch);
  const dispatch = useAppDispatch();

  const classes = useStyles();
  const {projectId} = useParams();
  const isNewCard = projectId === 'createNewCard';
  const [reset, setReset] = useState(false);
  const bgcolor = '#f6f8f9';

  useLayoutEffect(
    () => {
      if (!isNewCard) {
        dispatch(fetchProjectInfo(`${GET_PROJECT_INFO_URL}${projectId}`));
      }
      return () => {
        dispatch(resetProjectInfo());
      }
    },
    [projectId, dispatch, isNewCard]
  );

  return (
    isFetch ?
      <div className={classes.cardContainer}>
        <div className={classes.firstRow}>
          <Skeleton variant="text" width={'300px'} height={'72px'} animation="wave" sx={{bgcolor}}/>
          <Skeleton variant="text" width={'120px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
        </div>
        <div className={classes.mainSkeleton}>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div style={{gridRow: '1/ span 3', gridColumn: 2, placeSelf: 'normal'}}>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="rectangular" width={'100%'} height={'240px'} animation="wave"
                      sx={{marginTop: 1.5, bgcolor}}/>
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
          <div style={{gridRow: '4/ span 3', gridColumn: 2, placeSelf: 'normal'}}>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="rectangular" width={'100%'} height={'240px'} animation="wave"
                      sx={{marginTop: 1.5, bgcolor: '#f6f8f9'}}
            />
          </div>
          <div>
            <Skeleton variant="text" width={'120px'} height={'24px'} animation="wave" sx={{bgcolor}}/>
            <Skeleton variant="text" width={'300px'} height={'48px'} animation="wave" sx={{bgcolor}}/>
          </div>
        </div>
      </div>
      :
      <div className={classes.cardContainer}>
        <ProjectCard key={String(reset)} reset={setReset} isNewCard={isNewCard}/>
      </div>
  );
}

export default ConnectedProjectCard;