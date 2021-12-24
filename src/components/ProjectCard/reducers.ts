import { 
  IProjectCardDto, IProjectManagementDto, IProjectInfo,
  IProjectTeamCardDto, ProjectTypeDto, Technologies, IRecruitingCardDto
} from '../../app/store'

export function reducerCard(state: IProjectCardDto, action: {type: string, value: string}) {
  switch (action.type) {
    case 'projectName':
      return {...state, projectName: action.value};
    case 'creatorName':
      return {...state, creatorName: action.value};
    case 'finishingDate':
      return {...state, finishingDate: action.value};
    case 'firm':
      return {...state, firm: action.value};
    case 'isDocumentRequired':
      return {...state, isDocumentRequired: !state.isDocumentRequired};
    case 'functionalDirection':
      return {...state, functionalDirection: action.value};
    case 'projectArea':
      return {...state,  projectArea: action.value};
    case 'projectStage':
      return {...state,  projectStage: action.value};
    case 'status':
      return {...state,  status: action.value};
    default:
      throw new Error();
  }
}

export function reducerProjectManagment(state: IProjectManagementDto, action: {type: string, value: string}) {
  switch (action.type) {
    case 'isTimeChange':
      return {...state, isTimeChange: !state.isTimeChange};
    case 'dayStart':
      return {...state, dayStart: action.value};
    case 'dayEnd':
      return {...state, dayEnd: action.value};
    case 'description':
      return {...state, description: action.value};
    case 'tasks':
      return {...state, tasks: action.value};
    case 'overTime':
      return {...state, overTime: action.value};
    case 'isOffice':
      return {...state,  isOffice: !state.isOffice};
    case 'officeLocation':
      return {...state,  officeLocation: action.value};
    case 'teamStartDate':
      return {...state,  teamStartDate: action.value};
    case 'comment':
      return {...state, comment: action.value};
    default:
      throw new Error();
  }
}

export function reducerTeam(state: IProjectTeamCardDto, action: {type: string, value: string}) {
  switch (action.type) {
    case 'analytics':
      return {...state, analytics: action.value};
    case 'developers':
      return {...state, developers: action.value};
    case 'testers':
      return {...state, testers: action.value};
    case 'techWriters':
      return {...state, techWriters: action.value};
    case 'devOps':
      return {...state, devOps: action.value};
    case 'designers':
      return {...state,  designers: action.value};
    case 'developerRequirements':
      return {...state,  developerRequirements: action.value};
    case 'analyticsRequirements':
      return {...state,  analyticsRequirements: action.value};
    case 'methodology':
      return {...state,  methodology: action.value};
    case 'stakeHoldersCount':
      return {...state,  stakeHoldersCount: action.value};
    case 'isProductDevelop':
      return {...state,  isProductDevelop: !state.isProductDevelop};
    case 'isTeamFormed':
      return {...state,  isTeamFormed: !state.isTeamFormed};
    case 'teamСount':
      return {...state,  teamCount: action.value};
    default:
      throw new Error();
  }
}

export function reducerRecruting(state: IRecruitingCardDto, action: any) {
  switch (action.type) {
    case 'fullName':
      return {...state,  fullName: action.value};
    case 'phoneNumber':
      return {...state,  phoneNumber: action.value};
    case 'email':
      return {...state,   email: action.value};
    case 'employeeA':
      let newAArray = state.employeeAListDtoList;
      //@ts-ignore
      newAArray[action.id][action?.field] = action.value;
      return {...state,  employeeAListDtoList: newAArray};
    case 'employeeD':
      let newDArray = state.employeeDListDtoList;
      //@ts-ignore
      newDArray[action.id][action?.field] = action.value;
      return {...state,  employeeDListDtoList: newDArray};
    case 'newEmployeeD':
      return {...state,  employeeDListDtoList: [...state.employeeDListDtoList, {fullName: '', phoneNumber: '', email: ''}]}; 
    case 'newEmployeeA':
      return {...state,  employeeAListDtoList: [...state.employeeAListDtoList, {fullAnalyticName: '', phoneAnalyticNumber: '', emailAnalytic: ''}]}; 
    case 'deleteEmployeeD':
      console.log(action.value)
      let dSpliceArray = state.employeeDListDtoList;
      dSpliceArray.splice(action.value, 1)
      return {...state,  employeeDListDtoList: dSpliceArray};
    case 'deleteEmployeeA':
      let aSpliceArray = state.employeeAListDtoList;
      aSpliceArray.splice(action.value, 1)
      return {...state,  employeeAListDtoList: aSpliceArray}; 
    default:
      throw new Error();
  }
}

export function reducerProjectType(state: ProjectTypeDto, action: {type: string, value: string, index: number}) {
  switch (action.type) {
    case 'type':
      const newTypeArray = state.map((value, index) => index === action.index ? action.value: value);
      return newTypeArray; 
    default:
      throw new Error();
  }
}

export function reducerTechnologies(state: Technologies, action: {type: string, value: string}) {
  switch (action.type) {
    case 'technologiesAdd':
      const setAdd = new Set(state);
      setAdd.add(action.value);
      return Array.from(setAdd);
    case 'technologiesDelete':
      const setDel = new Set(state);
      setDel.delete(action.value);
      return Array.from(setDel);
    default:
      throw new Error();
  }
}