export const setProjectStage = 'setProjectStage';
export const setCreationPeriod = 'setCreationPeriod';
export const setProjectName = 'setProjectName';
export const setFirm = 'setFirm';
export const setCreatorName = 'setCreatorName';
export const setProjectArea = 'setProjectArea';
export const setProjectId = 'setProjectId';

export const setProjectStageAction = (value: string) => {
  return {type: setProjectStage, value}
}

export const setCreationPeriodAction = (from: number | null, to: number | null) => {
  return {type: setCreationPeriod, value: {from, to}}
}

export const setProjectNameAction = (value: string) => {
  return {type: setProjectName, value}
}

export const setFirmAction = (value: string) => {
  return {type: setFirm, value}
}

export const setCreatorNameAction = (value: string) => {
  return {type: setCreatorName, value}
}

export const setProjectAreaAction = (value: string) => {
  return {type: setProjectArea, value}
}

export const setProjectIdAction = (value: string) => {
  return {type: setProjectId, value}
}
