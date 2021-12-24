import {combineReducers} from 'redux';
import * as actionsCreators from './actionCreators';
import {
  PROJECT_INFO_CHANGED,
  PROJECTS_CHANGED,
  SET_STATUS_FILTER,
  SET_FILTERS, SET_ID,
  IS_FETCHING_PROJECT_INFO,
  RESET_PROJECT_ID,
  IS_POSTING_PROJECT_INFO,
  NEW_PROJECT_ID,
  RESET_PROJECT_INFO,
  IS_POSTING_STATUS_INFO,
  IS_POSTING_DELETE_PROJECT,
  SET_DELETE_ALERT,
  CHANGE_PROJECT_STATUS,
  DELETE_PROJECT,
  SET_STATUS_ALERT,
  SET_NETWORK_ERROR,
  IS_FETCHING_PROJECTS
} from './actions';
import {IProjectInfo, IProjectsList} from './store';
import {filtredProjects} from "./utils";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsType = ReturnType<InferValueTypes<typeof actionsCreators>>;

let now = (new Date()).toISOString();

export const initialProjectInfo: IProjectInfo = {
  id: 0,
  projectCardDto: {
    projectName: '',
    cardCreateDate: now,
    creatorName: '',
    finishingDate: '',
    isDocumentRequired: false,
    firm: '',
    functionalDirection: '',
    projectArea: '',
    projectStage: '',
    status: '',
  },
  projectManagementDto: {
    comment: '',
    isTimeChange: false,
    dayStart: '',
    dayEnd: '',
    description: '',
    tasks: '',
    teamStartDate: '',
    overTime: '',
    isOffice: false,
    officeLocation: '',
  },
  projectTeamCardDto: {
    analytics: '',
    developers: '',
    testers: '',
    techWriters: '',
    devOps: '',
    designers: '',
    analyticsRequirements: '',
    developerRequirements: '',
    isProductDevelop: false,
    methodology: '',
    stakeHoldersCount: '',
    isTeamFormed: false,
    teamCount: ''
  },
  projectTypeDto: ['', '', '', ''],
  technologies: [],
  recruitingCardDto: {
    employeeAListDtoList: [{fullAnalyticName: '', phoneAnalyticNumber: '', emailAnalytic: ''}],
    employeeDListDtoList: [{fullName: '', phoneNumber: '', email: ''}],
    fullName: '',
    phoneNumber: '',
    email: '',
  }
}

const ProjectInfoReducer = (state = initialProjectInfo, action: ActionsType) => {
  switch (action.type) {
    case PROJECT_INFO_CHANGED:
      return action.content ?? state;
    case RESET_PROJECT_INFO:
      return {...initialProjectInfo};
    default:
      return state;
  }
}

const ProjectInfoFetchingReducer = (state = false, action: ActionsType) => {
  switch (action.type) {
    case IS_FETCHING_PROJECT_INFO:
      return !state;
    default:
      return state;
  }
}

const projectDeleteAlert = (
  state = {visibility: 'hidden', error: false},
  action: ActionsType
) => {
  switch (action.type) {
    case SET_DELETE_ALERT:
      return {visibility: action.visibility, error: !!action.error};
    default:
      return state;
  }
}

const projectStatusAlert = (
  state = {visibility: 'hidden', error: false},
  action: ActionsType
) => {
  switch (action.type) {
    case SET_STATUS_ALERT:
      return {visibility: action.visibility, error: !!action.error};
    default:
      return state;
  }
}

export interface IFiltersState {
  projectStage: string
  creationPeriod: {
    from: number | null
    to: number | null
  }
  projectName: string
  firm: string
  creatorName: string
  projectArea: string
  projectId: string
}

interface IProjects {
  projectsList: IProjectsList;
  projectsIDs: number[];
  projectsOrder: number[];
  filters: IFiltersState;
  statusName: string;
}

const projectsInitial: IProjects = {
  projectsList: {},
  projectsIDs: [],
  projectsOrder: [],
  filters: {
    projectStage: '',
    creationPeriod: {
      from: null,
      to: null
    },
    projectName: '',
    firm: '',
    creatorName: '',
    projectArea: '',
    projectId: ''
  },
  statusName: ''
}

const ProjectsReducer = (state = projectsInitial, action: ActionsType) => {
  switch (action.type) {
    case PROJECTS_CHANGED:
      return {...state, projectsList: action.content}
    case SET_ID:
      return {...state, projectsIDs: action.array, projectsOrder: action.array}
    case SET_STATUS_FILTER:
      return {
        ...state,
        projectsOrder: filtredProjects(state.filters, state.projectsList, state.projectsIDs, action.status),
        statusName: action.status
      }
    case SET_FILTERS:
      return {
        ...state,
        projectsOrder: filtredProjects(action.filters, state.projectsList, state.projectsIDs, state.statusName),
        filters: action.filters
      }
    case CHANGE_PROJECT_STATUS:
      return {
        ...state,
        projectsList: {
          ...state.projectsList,
          [action.id]: {
            ...state.projectsList[action.id],
            'status': action.status
          }
        },
      }
    case DELETE_PROJECT:
      const newProjectList = state.projectsList
      delete newProjectList[action.id];
      return {
        ...state,
        projectsList: {
          ...newProjectList,
        },
        projectsIDs: state.projectsIDs.filter(id => id !== action.id)
      }
    default:
      return state;
  }
}

/*const editingReducer = (state = false, action: ActionsType) => {
  switch (action.type) {
    case IS_EDITING:
      return !state;
    default:
      return state;
  }
}*/

const postingInfo = {
  projectInfo: false,
  statusInfo: false,
  deleteProject: false,
}

export type TPostingInfo = typeof postingInfo;

const postingReducer = (state = postingInfo, action: ActionsType) => {
  switch (action.type) {
    case IS_POSTING_PROJECT_INFO:
      return {...state, projectInfo: !state.projectInfo}
    case IS_POSTING_STATUS_INFO:
      return {...state, statusInfo: !state.statusInfo}
    case IS_POSTING_DELETE_PROJECT:
      return {...state, deleteProject: !state.deleteProject}
    default:
      return state;
  }
}

const newIdReducer = (state: null | number = null, action: ActionsType) => {
  switch (action.type) {
    case  NEW_PROJECT_ID:
      return action.id;
    case  RESET_PROJECT_ID:
      return null;
    default:
      return state;
  }
}

const networkErrorReducer = (state = false, action: ActionsType) => {
  switch (action.type) {
    case  SET_NETWORK_ERROR:
      return action.value;
    default:
      return state;
  }
}

const projectsFetchingReducer = (state = false, action: ActionsType) => {
  switch (action.type) {
    case  IS_FETCHING_PROJECTS:
      return !state;
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  projectInfo: ProjectInfoReducer,
  projects: ProjectsReducer,
  projectInfoFetch: ProjectInfoFetchingReducer,
  projectsFetch: projectsFetchingReducer,
 /* editing: editingReducer,*/
  postingInfo: postingReducer,
  newId: newIdReducer,
  deleteAlert: projectDeleteAlert,
  statusAlert: projectStatusAlert,
  networkError: networkErrorReducer
});