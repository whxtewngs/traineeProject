import { createStore, applyMiddleware, ThunkAction } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AnyAction } from 'redux';
import { rootReducer, ActionsType } from './reducers';

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export type Store = typeof store;
export type RootState = ReturnType<typeof rootReducer>
export type TDispatch = ThunkDispatch<RootState, void, ActionsType>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
  >;

/*export const filteringOrder = (array: number[] | [], projects: IProjectsList, filterType: ProjectKeys, filterValue: string | undefined) => {
  filterValue = filterValue === 'active' ? 'Активен' : filterValue
  filterValue = filterValue === 'archive' ? 'Архив' : filterValue
  filterValue = filterValue === 'draft' ? 'Черновик' : filterValue
  if (!isFinite(array[0])) return []
  const filteredArray = array.filter(
    (element) => {
      const project = projects[element]
      return project?.[filterType] === filterValue
    }
  )

  return filteredArray
}*/

export interface IProjectCardDto {
  cardCreateDate: string
  creatorName: string
  finishingDate: string
  firm: string
  functionalDirection: string
  isDocumentRequired: boolean
  projectArea: string
  projectName: string
  projectStage: string
  status: string
}

export interface IProjectManagementDto {
  isTimeChange: boolean
  dayStart: string
  dayEnd: string
  description: string
  isOffice: boolean
  officeLocation: string
  overTime: string
  tasks: string
  teamStartDate: string
  comment: string
}

export interface IProjectTeamCardDto {
  analytics: string
  analyticsRequirements: string
  developerRequirements: string
  developers: string
  techWriters: string
  testers: string
  devOps: string
  designers: string
  isProductDevelop: boolean
  methodology: string
  stakeHoldersCount: string
  isTeamFormed: boolean
  teamCount: string
}

export type ProjectTypeDto = string[];
export type Technologies = string[];

export interface IRecruitingCardDto {
  employeeAListDtoList: { fullAnalyticName: string, phoneAnalyticNumber: string, emailAnalytic: string }[]
  employeeDListDtoList: { fullName: string, phoneNumber: string, email: string }[]
  fullName: string
  phoneNumber: string
  email: string
}

export interface IProjectInfo {
  id: number
  projectCardDto: IProjectCardDto
  projectManagementDto: IProjectManagementDto
  projectTeamCardDto: IProjectTeamCardDto
  projectTypeDto: ProjectTypeDto
  technologies: Technologies
  recruitingCardDto: IRecruitingCardDto
}

export interface IProjectMain {
  id: number;
  projectName: string;
  creatorName: string;
  projectStage: string;
  projectArea: string;
  firm: string;
  status: string;
  cardCreateDate: string;
}

export type ProjectKeys = Exclude<keyof IProjectMain, 'id'>;

export interface IProjectsList {
  [key: number]: IProjectMain,
}