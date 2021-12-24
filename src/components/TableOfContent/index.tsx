import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {createUseStyles} from 'react-jss';

import {IProjectMain} from '../../app/store';
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {
  setStatusFilter,
  setStatusAlert,
  setDeleteAlert,
  deleteProject,
  changeProjectStatus, setNetworkError
} from '../../app/actionCreators';
import {fetchProjects} from '../../app/thunkActions'

import {Link} from 'react-router-dom';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import BasicPopover from '../Popover';
import Pagination from './Pagination';
import {useKeycloak} from '@react-keycloak/web';
import Alert, {AlertColor} from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {Typography} from '@mui/material';
import {RenderOnRole} from '../AuthProvider';

const useStyles = createUseStyles({
  cardContainer: {
    boxSizing: 'border-box',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  header: {
    margin: 0,
    marginBottom: 8,

    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeight: 500,
    color: '#161a27',
  },
  table: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gap: '4px 0',

    borderCollapse: 'collapse',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    color: '#1f2936',

    '& th': {
      borderBottom: 'solid 1px lightgrey',
      marginBottom: 12,

      fontWeight: 'bold',
      color: '#878c96',
    },

    '& th:first-child': {
      marginLeft: 8,
    },

    '& th:last-child': {
      marginRight: 8,
    },

    '& td': {
      minHeight: 64,
    },

    '& td:first-child': {
      marginLeft: 8,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },

    '& td:last-child': {
      display: 'grid',
      placeItems: 'center',

      marginRight: 8,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4
    },
    ' & th': {
      display: 'grid',
      placeItems: 'center',

      minHeight: 64,

      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: 16,
    },
    '& thead, & tbody, & tr': {
      display: 'contents'
    },
  },
  tableWithPopover: {
    gridTemplateColumns: `
      72px minmax(100px, 250px) minmax(100px, 150px) minmax(100px, 180px) 
      minmax(100px, 1.33fr) 100px repeat(2, minmax(100px, 120px)) 64px`,
  },
  tableWithoutPopover: {
    gridTemplateColumns: `
      72px minmax(100px, 240px) minmax(100px, 150px) minmax(100px, 180px)
      minmax(100px, 1.33fr) 100px repeat(2, minmax(100px, 120px))`,
  },
  tableRow: {
    '&:hover td': {
      backgroundColor: '#f6f8f9'
    },
    cursor: 'pointer'
  },
  link: {
    boxSizing: 'border-box',

    display: 'grid',
    placeItems: 'center',
    height: '100%',
    padding: 8,

    textDecoration: 'none',
    color: 'black'
  },
  buttonLink: {
    textDecoration: 'none'
  },
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  pagination: {
    marginRight: 8
  },
  statusActive: {
    color: '#99d98c',
    fontWeight: 'bold'
  },
  statusArchive: {
    color: '#E63946',
    fontWeight: 'bold'
  },
  statusDraft: {
    color: '#f77f00',
    fontWeight: 'bold'
  },
  nothingShowAlert: {
    display: 'grid',
    placeItems: 'center',
  },
  tdItem: {
    textAlign: 'center',
    verticalAlign: 'middle'
  }
});

const transformStatus = (status: string) => {
  return (
    status === 'draft' ? 'Черновик' :
      status === 'active' ? 'Активна' :
        status === 'archive' ? 'В архиве' : ''
  );
}

interface IProps {
  url: string
}

const ConnectedTableOfContent = (
  {
    url,
  }: IProps
) => {
  const {projectsList, projectsOrder} = useAppSelector(state => state.projects);
  const networkError = useAppSelector(state => state.networkError);
  const deleteAlert = useAppSelector(state => state.deleteAlert);
  const statusAlert = useAppSelector(state => state.statusAlert);

  const dispatch = useAppDispatch();

  const [sort, setSort] = useState(false)
  const [pagination, setPagination] = useState({minIndex: 0, maxIndex: 9})
  const [page, setPage] = useState(0);
  const [snackbarState, setSnackbar] = useState<{ isOpen: boolean, text: string, type: AlertColor }>({
    isOpen: false,
    text: '',
    type: 'success'
  });
  const [isRole, setRole] = useState(false);
  const [willDeleteProject, setWillDeleteProject] = useState(0);
  const [willStatusChanged, setWillStatusChanged] = useState({id: 0, status: ''});

  const classes = useStyles();
  const {projectsStatus} = useParams();
  const {keycloak, initialized} = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  useEffect(
    () => {
      setRole(true)
      //setRole(keycloak.hasRealmRole('projectManagement') || keycloak.hasResourceRole('projectManagement'));
    },
    [initialized]
  )

  useEffect(
    () => {
      if (networkError) {
        setSnackbar({isOpen: true, text: 'Ошибка сети! Не удалось загрузить проекты.', type: 'error'});
      }
    },
    [networkError]
  )

  useEffect(
    () => {
      dispatch(fetchProjects(url, kcToken))
    },
    [dispatch, kcToken, url]
  )

  useEffect(
    () => {
      const isOpen = statusAlert.visibility === 'shown';
      const text = !statusAlert.error ?
        'Статус карточки успешно обновлен!' :
        'Ошибка сети! Не удалось обновить статус. Попробуйте снова позже.';
      const type = !statusAlert.error ? 'success' : 'error';

      if (willStatusChanged.id !== 0 && !statusAlert.error && isOpen) {
        dispatch(changeProjectStatus(willStatusChanged.id, willStatusChanged.status));
      }

      if (isOpen) {
        setSnackbar({
          isOpen,
          text,
          type
        });


        dispatch(setStatusAlert('hidden', false));
        dispatch(setNetworkError(false));
        setWillStatusChanged({id: 0, status: ''});
      }
    },
    [dispatch, statusAlert.error, statusAlert.visibility, willStatusChanged.id, willStatusChanged.status]
  )

  useEffect(
    () => {
      const isOpen = deleteAlert.visibility === 'shown';
      const text = !deleteAlert.error ?
        'Карточка проекта успешно удалена!' :
        'Ошибка сети! Не удалось удалить карточку проекта. Попробуйте снова позже.';
      const type = !deleteAlert.error ? 'success' : 'error';

      if (willDeleteProject !== 0 && !deleteAlert.error && isOpen) {
        dispatch(deleteProject(willDeleteProject));
      }

      if (isOpen) {
        setSnackbar({
          isOpen,
          text,
          type
        });

        setWillDeleteProject(0);
        dispatch(setDeleteAlert('hidden', false));
        dispatch(setNetworkError(false));
      }
    },
    [deleteAlert, dispatch, willDeleteProject]
  )

  useEffect(
    () => {
      const status = transformStatus(projectsStatus ?? '');
      dispatch(setStatusFilter(status));
    },
    [dispatch, projectsStatus]
  )

  const createRow = (data: IProjectMain, id: number) => {
    let array = [];
    for (let [key, value] of Object.entries(data)) {
      if (key === 'cardCreateDate') {
        const date = new Date(value);
        array.push(
          <td key={key}>
            <Link to={`/card/${data.id}`} className={classes.link}>
              {date.toLocaleDateString()}
            </Link>
          </td>);
        continue
      }
      if (key === 'status') {
        array.push(<td key={key}>
          <Link to={`/card/${data.id}`}
                className={`
                  ${classes.link} 
                  ${value === 'Черновик' ? classes.statusDraft :
                  value === 'В архиве' ? classes.statusArchive : classes.statusActive}`}
          >
            {value}
          </Link>
        </td>);
        continue
      }
      array.push(
        <td key={key}>
          <Link to={`/card/${data.id}`} className={classes.link}>
          <span className={classes.tdItem}>
            {value}
          </span>
          </Link>
        </td>);
    }
    array.push(
      /* <RenderOnRole roles={['projectManagement']}> */
      <td key='popover'>
        <BasicPopover projectId={data.id} projectStatus={data.status}
                      setWillDeleteProject={setWillDeleteProject}
                      setWillStatusChanged={setWillStatusChanged}
        />
      </td>
      /* </RenderOnRole>  */
    )

    return <tr key={id} className={classes.tableRow}>{array}</tr>
  }

  const showingProjects = projectsOrder.sort(
    (a, b) => {
      if (sort) {
        return a - b
      } else {
        return b - a
      }
    }
  ).map(
    (projectId, index) => {
      if (index >= pagination.minIndex && index <= pagination.maxIndex) {
        return createRow(projectsList[projectId], projectId)
      }

      return null
    }
  );

  return (
    <>
      <Snackbar open={snackbarState.isOpen}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                autoHideDuration={3000}
                onClose={() => setSnackbar({isOpen: false, text: '', type: snackbarState.type})}
      >
        <Alert onClose={() => setSnackbar({isOpen: false, text: '', type: snackbarState.type})}
               severity={snackbarState.type}>
          {snackbarState.text}
        </Alert>
      </Snackbar>
      <div className={classes.cardContainer}>
        <div>
          <table className={`${classes.table} ${isRole ? classes.tableWithPopover : classes.tableWithoutPopover}`}>
            <thead>
            <tr>
              <th>№</th>
              <th>Наименование</th>
              <th>Автор</th>
              <th>Заказчик</th>
              <th>Предметная область</th>
              <th>Статус</th>
              <th>Стадия проекта</th>
              <th>
                <div className={classes.headerIcon} onClick={
                  () => {
                    setSort((state) => !state)
                  }
                }>
                  <span>Дата создания</span>
                  {sort ? <ArrowDropUpRoundedIcon/> : <ArrowDropDownRoundedIcon/>}
                </div>
              </th>
              {isRole &&
                  <th>
                  </th>}
            </tr>
            </thead>
            <tbody>
            {showingProjects}
            </tbody>
          </table>
          {showingProjects.length === 0 &&
              <div className={classes.nothingShowAlert}>
                  <Typography variant='h3'>Нет результатов</Typography>
              </div>
          }
        </div>
        <div className={classes.pagination}>
          <Pagination count={projectsOrder.length} pageNumber={page} setPage={setPage} setPagination={setPagination}/>
        </div>
      </div>
    </>
  );
}

export default ConnectedTableOfContent;