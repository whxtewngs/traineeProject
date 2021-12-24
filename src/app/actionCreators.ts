import {IProjectInfo, IProjectsList} from "./store";
import {
  CHANGE_PROJECT_STATUS,
  DELETE_PROJECT,
  RESET_PROJECT_ID,
  IS_FETCHING_PROJECT_INFO,
  IS_FETCHING_PROJECTS,
  IS_POSTING_DELETE_PROJECT,
  IS_POSTING_PROJECT_INFO,
  IS_POSTING_STATUS_INFO,
  NEW_PROJECT_ID,
  PROJECT_INFO_CHANGED,
  PROJECTS_CHANGED,
  RESET_PROJECT_INFO,
  SET_FILTERS,
  SET_ID,
  SET_NETWORK_ERROR,
  SET_STATUS_FILTER,
  SET_DELETE_ALERT,
  SET_STATUS_ALERT
} from "./actions";
import {IFiltersState} from "./reducers";

export const setIDs = (array: number[]) => ({
  type: SET_ID,
  array
} as const)

export const changeProjectStatus = (id: number, status: string) => ({
  type: CHANGE_PROJECT_STATUS,
  id,
  status
} as const)

export const deleteProject = (id: number) => ({
  type: DELETE_PROJECT,
  id
} as const)

export const isPostStatusInfo = () => ({
  type: IS_POSTING_STATUS_INFO
} as const)

export const isPostDeleteProject = () => ({
  type: IS_POSTING_DELETE_PROJECT
} as const)

export const infoChanged = (content: IProjectInfo) => ({
  type: PROJECT_INFO_CHANGED,
  content
} as const)

export const projectsChanged = (content: IProjectsList) => ({
  type: PROJECTS_CHANGED,
  content
} as const)

export const setStatusFilter = (status: string) => ({
  type: SET_STATUS_FILTER,
  status
} as const)

export const isFetchingProjectInfo = () => ({
  type: IS_FETCHING_PROJECT_INFO,
} as const)

export const isFetchingProjects = () => ({
  type: IS_FETCHING_PROJECTS,
} as const)

export const isPostingProjectInfo = () => ({
  type: IS_POSTING_PROJECT_INFO,
} as const)

export const newProjectId = (id: number | null) => ({
  type: NEW_PROJECT_ID,
  id
} as const)

export const resetProjectId = () => ({
  type: RESET_PROJECT_ID
} as const)

export const setFilters = (filters: IFiltersState) => ({
  type: SET_FILTERS,
  filters
} as const)

export const setNetworkError = (value: boolean) => ({
  type: SET_NETWORK_ERROR,
  value
} as const)

export const resetProjectInfo = () => ({
  type: RESET_PROJECT_INFO
} as const)

export const setStatusAlert = (visibility: 'shown' | 'hidden', error?: boolean) => ({
  type: SET_STATUS_ALERT,
  visibility,
  error
} as const)

export const setDeleteAlert = (visibility: 'shown' | 'hidden', error?: boolean) => ({
  type: SET_DELETE_ALERT,
  visibility,
  error
} as const)