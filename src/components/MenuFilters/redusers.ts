import {
  setProjectStage,
  setCreationPeriod,
  setProjectName,
  setFirm,
  setCreatorName,
  setProjectArea,
  setProjectId
} from './actions';
import {IFiltersState} from '../../app/reducers';

export const initialState = {
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
};

/* function reducer(state: IFiltersState, action: {type: string, value: string }): IFiltersState;
function reducer(state: IFiltersState, action: {type: string, value: {from: number | null, to: number | null} }): IFiltersState; */
function reducer(state: IFiltersState, action: { type: string, value: any }): IFiltersState {
  switch (action.type) {
    case setProjectStage:
      return {...state, projectStage: action.value};
    case setCreationPeriod:
      return {...state, creationPeriod: {from: action.value.from, to: action.value.to}};
    case setProjectName:
      return {...state, projectName: action.value};
    case setFirm:
      return {...state, firm: action.value};
    case setCreatorName:
      return {...state, creatorName: action.value};
    case setProjectArea:
      return {...state, projectArea: action.value};
    case setProjectId:
      return {...state, projectId: action.value};
    default:
      throw new Error();
  }
}

export {reducer};