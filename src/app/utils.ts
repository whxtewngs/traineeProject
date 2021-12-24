import {IFiltersState} from "./reducers";
import {IProjectsList} from "./store";

const ignoreCaseIncludes = (firstString: string, secondString: string) => {
  const str1 = firstString.toLowerCase();
  const str2 = secondString.toLowerCase();
  return str1.includes(str2);
}

export const filtredProjects = (filtres: IFiltersState, projectsList: IProjectsList, projectsOrder: number[], statusName: string) => {
  let newOrder: number[] = projectsOrder;

  if (statusName !== '') {
    newOrder = newOrder.filter(value => projectsList[value].status === statusName)
  }

  if (filtres.projectStage !== '') {
    newOrder = newOrder.filter(id => projectsList[id].projectStage === filtres.projectStage);
  }

  if (filtres.creationPeriod.from !== null || filtres.creationPeriod.to !== null) {
    const from = filtres.creationPeriod.from ?? (new Date('0')).getTime();
    const to = filtres.creationPeriod.to ?? (new Date('6000')).getTime();
    newOrder = newOrder.filter(
      id => {
        const projectDate = new Date(projectsList[id].cardCreateDate);
        return (
          from < projectDate.getTime() && projectDate.getTime() < to
        )
      }
    )
  }

  if (filtres.projectName !== '') {
    newOrder = newOrder.filter(
      id => ignoreCaseIncludes(projectsList[id].projectName, filtres.projectName)
    )
  }

  if (filtres.creatorName !== '') {
    newOrder = newOrder.filter(
      id => ignoreCaseIncludes(projectsList[id].creatorName, filtres.creatorName)
    )
  }

  if (filtres.firm !== '') {
    newOrder = newOrder.filter(
      id => ignoreCaseIncludes(projectsList[id].firm, filtres.firm)
    )
  }

  if (filtres.projectArea !== '') {
    newOrder = newOrder.filter(
      id => ignoreCaseIncludes(projectsList[id].projectArea, filtres.projectArea)
    )
  }

  if (filtres.projectId !== '') {
    newOrder = newOrder.filter(
      id => projectsList[id].id === Number(filtres.projectId)
    )
  }

  return newOrder;
}