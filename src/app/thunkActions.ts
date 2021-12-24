import {ActionCreator} from "redux";
import {AppDispatch, IProjectInfo, IProjectMain, AppThunk} from "./store";
import axios from "axios";
import {
  infoChanged,
  isFetchingProjectInfo,
  isFetchingProjects,
  isPostDeleteProject,
  isPostingProjectInfo,
  isPostStatusInfo,
  newProjectId,
  projectsChanged,
  setIDs,
  setNetworkError,
  setDeleteAlert,
  setStatusAlert
} from "./actionCreators";

export const fetchProjectInfo = (url: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch(isFetchingProjectInfo());

  axios.get<[IProjectInfo]>(url, {
    /*  headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET,POST',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
     }  */
  })
    .then(
      response => {
        return response.data
      },
      error => console.log('An error occurred.', error)
    )
    .then(array => {
      if (Array.isArray(array)) {
        dispatch(infoChanged(array[0]))
      }
    })
    .finally(() => dispatch(isFetchingProjectInfo()))
}

export const fetchProjects = (url: string, kcToken: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch(isFetchingProjects())

  axios.get<IProjectMain[]>(url,
    {
      /* headers: {
        'Authorization': 'Bearer ' + kcToken,
        'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
      }    */
    }
  )
    .then(
      response => response.data
    )
    .then(
      (array) => {
        if (Array.isArray(array)) {
          const projects = array.reduce(
            (previousValue: IProjectMain | {}, currentValue: IProjectMain) => {
              return {...previousValue, [currentValue.id]: currentValue}
            },
            {}
          )
          dispatch(projectsChanged(projects));
          const keys = array.map((value: IProjectMain) => value.id);
          dispatch(setIDs(keys));
        }
      }
    )
    .catch((error) => {
      console.log('An error occurred.', error)
      dispatch(setNetworkError(true))
    })
    .finally(() => {
      dispatch(isFetchingProjects())
    })
}

export const postProjectInfo: ActionCreator<AppThunk> = (url: string, kcToken: string) => (dispatch: AppDispatch, getState) => {
  dispatch(isPostingProjectInfo());

  return axios.post<number>(url, JSON.stringify(getState().projectInfo), {
      /* headers: {
        'Authorization': 'Bearer ' + keycloak?.token ?? '',
        'Access-Control-Allow-Origin': '',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json'
      },  */
    }
  )
    .then(
      response => response.data,
    )
    .then(response => {
      if (typeof response === 'number') {
        dispatch(newProjectId(response))
      }
    })
    .then(() => dispatch(isPostingProjectInfo()))
    .catch((error) => {
      console.log('An error occurred.', error)
      dispatch(setNetworkError(true))
      dispatch(isPostingProjectInfo())
    })
}

export const postStatusInfo: ActionCreator<AppThunk> = (url: string, kcToken: string, status: string, id: number) => (dispatch: AppDispatch, getState) => {
  dispatch(isPostStatusInfo());

  return axios.post(url, JSON.stringify({id, status}), {
    /* headers: {
      'Authorization': 'Bearer ' + keycloak?.token ?? '',
      'Access-Control-Allow-Origin': '',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Content-Type': 'application/json'
    },   */
  })
    .then(() => {
      dispatch(setStatusAlert('shown'))
    })
    .catch(
      error => {
        dispatch(setNetworkError(true))
        dispatch(setStatusAlert('shown', true))
        console.log('An error occurred.', error)
      }
    )
    .finally(() => dispatch(isPostStatusInfo()))
}

export const postDeleteProject = (url: string, kcToken: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch(isPostDeleteProject());

  return axios.post(url, {}, {
    /* headers: {
      'Authorization': 'Bearer ' + keycloak?.token ?? '',
      'Access-Control-Allow-Origin': '',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Content-Type': 'application/json'
    },  */
  })
    .then(() => {
      dispatch(isPostDeleteProject());
      dispatch(setDeleteAlert('shown'));
    })
    .catch(
      error => {
        dispatch(setNetworkError(true));
        dispatch(isPostDeleteProject());
        dispatch(setDeleteAlert('shown', true));
        console.log('An error occurred.', error);
      }
    )
}