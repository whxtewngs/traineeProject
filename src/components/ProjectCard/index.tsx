import React, {useEffect, useReducer, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
  fetchProjectInfo,
  postProjectInfo,
  postDeleteProject,
  postStatusInfo
} from '../../app/thunkActions';
import {
  resetProjectInfo,
  resetProjectId,
  setDeleteAlert,
  setNetworkError,
  setStatusAlert,
  infoChanged
} from '../../app/actionCreators';
import {
  reducerCard, reducerProjectManagment, reducerRecruting,
  reducerTeam, reducerProjectType, reducerTechnologies,
} from './reducers';

import {useParams} from "react-router-dom";
import {createUseStyles} from 'react-jss';
import {useNavigate} from 'react-router';
import {useKeycloak} from '@react-keycloak/web';

import Button from '@mui/material/Button';
import TextField from '../TextField';
import RadioButtonsGroup from '../RadioButtonsGroup';
import Autocomplete from '../Autocomplete';
import Select from '../Select';
import DatePicker from '../DatePicker';
import TextArea from '../TextArea';
import Switch from '../Switch';
import CustomizedTabs from '../Tabs';
import MultiAutocomplete from '../MultiAutocomplete';
import NumberField from '../NumberField';
import LocationPicker from '../LocationPicker';
import LinkIcon from '@mui/icons-material/Link';
import RecrutingForm from '../RecrutingForm';
import AlertDialog from '../Dialog';
import TimeChangePicker from '../TimeChangePicker';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {CircularProgress} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {RenderOnRole} from '../AuthProvider';

import {
  POST_PROJECT_CREATE_URL,
  POST_PROJECT_UPDATE_URL,
  GET_PROJECT_AREA_AUTOCOMPLETE_URL,
  GET_TECH_AUTOCOMPLETE_URL,
  GET_FIRM_AUTOCOMPLETE_URL,
  POST_PROJECT_STATUS_URL,
  DELETE_PROJECT_URL, GET_PROJECT_INFO_URL
} from '../../app/urls';

const useStyles = createUseStyles({
  cardContainer: {
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    minHeight: 'calc(100vh - 16px)'
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto'
  },
  card: {
    padding: 16,
  },
  firstRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'start',
    fontFamily: 'Roboto',
    color: '#878c96',
  },
  cardTab: {
    display: 'grid',
    placeContent: 'center',
    gridTemplateColumns: '340px 1fr 340px',
    //gridTemplateColumns: '460px 600px',
    backgroundColor: '#ffffff',
    gap: '0 24px',
    paddingBottom: 16

  },
  columnLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#ebeef0'
  },
  rowLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ebeef0',
    gridColumn: '1/-1'
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 16,
    gap: 24,

    '&:nth-of-type(odd)': {
      alignItems: 'center'
    }
  },
  cardWrapper: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: 'white',
    display: 'grid',
    placeItems: 'center',
  },
  containerComponent: {
    display: 'grid',
    width: 320,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 40,
    gap: 8,
    boxSizing: 'border-box',
    textDecoration: 'none',
    color: '#878c96',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    borderLeft: '2px solid transparent',
    '&:hover': {
      color: '#b7bfc8'
    }
  },
  projectMainInfo: {
    display: 'grid',
    gap: 8,
    marginBottom: 32
  },
  teamContainer: {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignContent: 'center',
    justifyContent: 'start',
    gap: '16px 40px',
    width: 320
  }
});

interface IProps {
  reset: React.Dispatch<React.SetStateAction<boolean>>,
  isNewCard: boolean
}

const ConnectedProjectCard = (
  {
    reset,
    isNewCard
  }: IProps
) => {
  const projectInfo = useAppSelector(state => state.projectInfo);
  const newId = useAppSelector(state => state.newId);
  const postingInfo = useAppSelector(state => state.postingInfo);
  const deleteAlert = useAppSelector(state => state.deleteAlert);
  const networkError = useAppSelector(state => state.networkError);
  const reduxDispatch = useAppDispatch();

  const [stateCard, dispatchCard] = useReducer(reducerCard, projectInfo.projectCardDto);
  const [statePM, dispatchPM] = useReducer(reducerProjectManagment, projectInfo.projectManagementDto);
  const [stateTeam, dispatchTeam] = useReducer(reducerTeam, projectInfo.projectTeamCardDto);
  const [stateType, dispatchType] = useReducer(reducerProjectType, projectInfo.projectTypeDto);
  const [stateTech, dispatchTech] = useReducer(reducerTechnologies, projectInfo.technologies);
  const [stateRecruting, dispatchRecruting] = useReducer(reducerRecruting, projectInfo.recruitingCardDto);

  const [stateError, setError] = useState(false);
  const [stateDeletePosting, setDeletePosting] = useState(false);
  const [statePostingInfoProgress, setPostingInfoProgress] = useState(false);
  const [stateStatusPosting, setStatusPosting] = useState(false);
  const [statusSnackBar, showStatusSnackBar] = useState(false);
  const [errorSnackBar, showErrorSnackBar] = useState(false);
  const [projectInfoSnackBar, showProjectInfoSnackBar] = useState(false);

  const classes = useStyles();
  const navigate = useNavigate();
  const {keycloak, initialized} = useKeycloak();

  const [stateDisplay, setDisplay] = useState(!isNewCard);
  const id = projectInfo.id;

  useEffect(
    () => {
      if (newId !== null && isNewCard) {
        navigate(`/card/${newId}`);
        reduxDispatch(resetProjectId());
      }
    },
    [isNewCard, navigate, newId, reduxDispatch]
  )

  useEffect(
    () => {
      if (initialized && keycloak?.token && isNewCard) {
        keycloak.loadUserProfile()
          .then(
            user => {
              dispatchCard({type: 'creatorName', value: `${user?.firstName} ${user?.lastName}`})
            }
          )
      }
    },
    [initialized, isNewCard, keycloak]
  )

  useEffect(
    () => {
      if (stateDeletePosting && !postingInfo.deleteProject) {
        if (!deleteAlert.error) {
          navigate(`/table/all`);
        } else {
          showErrorSnackBar(true);
          reduxDispatch(setDeleteAlert('hidden', false))
        }
      }
    },
    [deleteAlert.error, navigate, postingInfo.deleteProject, reduxDispatch, stateDeletePosting]
  )

  useEffect(
    () => {
      if (statePostingInfoProgress && !postingInfo.projectInfo) {
        if (!networkError) {
          showProjectInfoSnackBar(true);
        } else {
          setDisplay(false);
          showErrorSnackBar(true);
          reduxDispatch(setNetworkError(false));
        }
      }
    },
    [networkError, postingInfo.projectInfo, statePostingInfoProgress]
  )

  useEffect(
    () => {
      if (stateStatusPosting && !postingInfo.statusInfo) {
        if (!networkError) {
          stateCard.status === 'Активна' ?
            dispatchCard({type: 'status', value: 'В архиве'}) :
            dispatchCard({type: 'status', value: 'Активна'});

          setStatusPosting(false);
          showStatusSnackBar(true);
          showProjectInfoSnackBar(true);
        } else {
          showErrorSnackBar(true);
          reduxDispatch(setNetworkError(false));
          reduxDispatch(setStatusAlert('hidden', false))
        }
      }
    },
    [networkError, postingInfo.statusInfo, reduxDispatch, stateCard.status, stateStatusPosting]
  )

  const recrutingValidation = (object: object) => {
    let isFull = true;
    Object.values(object).forEach(value => {
      if (typeof value === 'object') {
        isFull = recrutingValidation(value);
      } else if (value === '') {
        isFull = false;
      }
    })

    return isFull
  }

  const validationCheck = () => {
    let recrutingError = false;

    if (stateType[0] === 'Т&М' && !recrutingValidation(stateRecruting)) {
      recrutingError = true;
    }

    const result = (
      stateCard.firm !== ''
      &&
      stateCard.projectStage !== ''
      &&
      statePM.description !== ''
      &&
      stateType.every((value) => value !== '')
      &&
      (!statePM.isOffice || statePM.officeLocation !== '')
      &&
      !recrutingError
    )

    result ?
      dispatchCard({type: 'status', value: 'Активна'}) :
      dispatchCard({type: 'status', value: 'Черновик'});

    return result;
  }

  const showTabsError = (error: boolean, isDisplayText: boolean) => {
    let array: boolean[] = [false, false, false];

    if (!error || isDisplayText) return array

    if (
      stateCard.firm === ''
      ||
      stateCard.projectStage === ''
      ||
      stateType.some((value) => value === '')
    ) {
      array[0] = true
    }

    if (
      statePM.isOffice && statePM.officeLocation === ''
    ) {
      array[1] = true
    }

    if (
      stateType[0] === 'Т&М' && !recrutingValidation(stateRecruting)
    ) {
      array[2] = true
    }

    return array
  }

  const handleSave = () => {
    setDisplay(state => !state);

    const status = validationCheck() ? 'Активна' : 'Черновик';

    reduxDispatch(
      infoChanged(
        {
          id,
          projectCardDto: {...stateCard, status},
          projectManagementDto: {...statePM},
          projectTeamCardDto: {...stateTeam},
          projectTypeDto: stateType,
          technologies: stateTech,
          recruitingCardDto: {...stateRecruting}
        })
    );

    if (isNewCard) {
      reduxDispatch(postProjectInfo(POST_PROJECT_CREATE_URL, keycloak?.token ?? ''));
    } else {
      reduxDispatch(postProjectInfo(POST_PROJECT_UPDATE_URL, keycloak?.token ?? ''));
    }

    setPostingInfoProgress(true);
  }

  const handleCancel = () => {
    if (!validationCheck()) {
      setError(true)
      return
    }
  }

  const deleteProgress = stateDeletePosting && postingInfo.deleteProject;

  const backdrop = deleteProgress ? (
    <Backdrop
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={true}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  ) : null

  return (
    <div className={classes.cardContainer}>
      <div className={classes.card}>
        <Snackbar open={projectInfoSnackBar} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  autoHideDuration={5000} onClose={() => showProjectInfoSnackBar(false)}
        >
          <Alert onClose={() => showProjectInfoSnackBar(false)} severity="success">Карточка проекта успешно
            сохранена!</Alert>
        </Snackbar>
        <Snackbar open={statusSnackBar} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  autoHideDuration={5000} onClose={() => showStatusSnackBar(false)}
        >
          <Alert onClose={() => showStatusSnackBar(false)} severity="success">Статус проекта успешно обновлен!</Alert>
        </Snackbar>
        <Snackbar open={errorSnackBar} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  autoHideDuration={5000} onClose={() => showErrorSnackBar(false)}
        >
          <Alert onClose={() => showErrorSnackBar(false)} severity="error">Ошибка сети! Попробуйте снова позже.</Alert>
        </Snackbar>
        {backdrop}
        <div className={classes.firstRow}>
          {stateDisplay ?
            <div className={classes.projectMainInfo}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
            <span className={classes.projectName}>
              {`${stateCard.projectName} #${id}`}
            </span>
                <div>
                  <Tooltip title="Скопировать ссылку">
                    <Button variant="text" id="copyLinkButton" size="small" sx={{minWidth: 32, width: 32,}}>
                      <LinkIcon/>
                    </Button>
                  </Tooltip>
                  {stateCard.status === 'Черновик' ? null :
                    stateCard.status === 'Активна' ?
                      <RenderOnRole roles={['projectManagement']}>
                        <Tooltip title="В архив">
                          <LoadingButton variant="text" size="small" color="secondary" sx={{minWidth: 32, width: 32,}}
                                         loadingIndicator={<CircularProgress color="inherit" size={16}/>}
                                         loading={postingInfo.statusInfo}
                                         onClick={
                                           () => {
                                             setStatusPosting(true);
                                             reduxDispatch(
                                               postStatusInfo(POST_PROJECT_STATUS_URL, keycloak?.token ?? '', 'В архиве', id)
                                             );
                                           }
                                         }>
                            <ArchiveIcon/>
                          </LoadingButton>
                        </Tooltip>
                      </RenderOnRole>
                      :
                      <RenderOnRole roles={['projectManagement']}>
                        <Tooltip title="Убрать из архива">
                          <LoadingButton
                            variant="text" size="small" color="success" sx={{minWidth: 32, width: 32,}}
                            loading={postingInfo.statusInfo}
                            loadingIndicator={<CircularProgress color="inherit" size={16}/>}
                            onClick={
                              () => {
                                setStatusPosting(true)
                                reduxDispatch(
                                  postStatusInfo(POST_PROJECT_STATUS_URL, keycloak?.token ?? '', 'Активен', id)
                                )
                              }
                            }
                          >
                            <UnarchiveIcon/>
                          </LoadingButton>
                        </Tooltip>
                      </RenderOnRole>
                  }
                </div>
              </div>
              <div style={{display: 'flex', gap: 16}}>
            <span className={classes.text}>
              Статус: 
              <span
                style={{
                  color: stateCard.status === 'Активна' ? '#99D98C' :
                    stateCard.status === 'В архиве' ? '#E63946' : '#f77f00'
                }}
              >
                {stateCard.status}
              </span>
            </span>
                <span
                  className={classes.text}>Дата создания: {(new Date(stateCard.cardCreateDate)).toLocaleDateString()}</span>
                <span className={classes.text}>Автор: {stateCard.creatorName}</span>
              </div>
            </div>
            :
            <div>
              <TextField label="Наименование проекта"
                         value={stateCard.projectName} dispatch={dispatchCard}
                         actionType={'projectName'} required error={stateError}
              />
            </div>}
          {stateDisplay && !postingInfo.projectInfo ?
            <div style={{display: 'flex', gap: 16, justifySelf: 'end', flexWrap: 'wrap', justifyContent: 'end'}}>
              <RenderOnRole roles={['projectManagement']}>
                <>
                  <AlertDialog
                    onClickAgree={
                      () => {
                        reduxDispatch(postDeleteProject(`${DELETE_PROJECT_URL}${id}`, keycloak?.token ?? ''));
                        setDeletePosting(true);
                      }
                    }
                    alertText={<span>{`Удалить проект «${stateCard.projectName} #${id}»?`} <br/> Это действие невозможно отменить.</span>}
                    cancelText='Отменить' agreeText='Удалить'
                  >
                    <Button variant="outlined" size='medium' color="secondary"
                            startIcon={<DeleteOutlineOutlinedIcon/>}
                    >
                      Удалить
                    </Button>
                  </AlertDialog>
                  <Button variant="outlined" onClick={() => setDisplay((state) => !state)}>Редактировать</Button>
                </>
              </RenderOnRole>
            </div>
            :
            <div style={{display: 'flex', gap: 16, justifySelf: 'end'}}>
              {!postingInfo.projectInfo &&
                  <AlertDialog onClickCancel={
                    () => {
                      if (isNewCard) navigate(`/table/all`)
                      reset(state => !state)
                    }
                  }
                               alertText={<span>Вы уверены, что хотите отменить внесенные изменения?<br/>
                Все несохраненные данные будут потеряны!</span>}
                               cancelText='Отменить изменения' agreeText='Продолжить редактирование'
                  >
                      <Button variant="outlined" color="secondary">
                          Отменить
                      </Button>
                  </AlertDialog>}
              <AlertDialog onClickAgree={handleSave} onClickCancel={handleCancel} validationCheck={validationCheck}
                           alertText={<span>Обязательные поля не заполнены. <br/> В случае незаполнения - карточка будет сохранена в черновиках.</span>}
                           cancelText='Редактировать' agreeText='Сохранить'
              >
                <LoadingButton variant="outlined" loading={postingInfo.projectInfo} startIcon={<SaveIcon/>}
                               loadingPosition="start">
                  Сохранить
                </LoadingButton>
              </AlertDialog>
            </div>}
        </div>
        <div className={classes.rowLine}/>
        <CustomizedTabs errorArray={showTabsError(stateError, stateDisplay)} showRecrutTab={stateType[0] === 'Т&М'}>
          <div className={classes.cardTab}>
            <div className={classes.columnContainer} style={{alignItems: 'center'}}>
              <Autocomplete label="Закзачик" error={stateError} url={GET_FIRM_AUTOCOMPLETE_URL}
                            value={stateCard.firm} dispatch={dispatchCard} isDisplayText={stateDisplay}
                            actionType={'firm'} required={!stateDisplay}
              />
              <div className={classes.rowLine}/>
              <Select label="Стадия проекта"
                      value={stateCard.projectStage} dispatch={dispatchCard} actionType={'projectStage'}
                      error={stateError}
                      selectList={['Инициация', 'Начало', 'Середина', 'Завершение']} required={!stateDisplay}
                      isDisplayText={stateDisplay}
              />
              <RadioButtonsGroup label="Тип проекта" arrayOfTypes={stateType} required={!stateDisplay}
                                 actionType={'type'} dispatch={dispatchType} isDisplayText={stateDisplay}
                                 error={stateError}
              />
              <div className={classes.rowLine}/>
              <Switch label="Документирование по ГОСТу" checked={stateCard.isDocumentRequired}
                      isDisplayText={stateDisplay}
                      actionType="isDocumentRequired" dispatch={dispatchCard}
              />
            </div>
            <div className={classes.columnContainer}>
              <TextArea label="Описание проекта" rows={12} required={!stateDisplay} error={stateError}
                        value={statePM.description} dispatch={dispatchPM} actionType={'description'}
                        isDisplayText={stateDisplay}
              />
              <TextArea label="Задачи решаемые на проекте" rows={9}
                        value={statePM.tasks} dispatch={dispatchPM} actionType={'tasks'} isDisplayText={stateDisplay}
              />
            </div>
            <div className={classes.columnContainer} style={{alignItems: 'center'}}>
              <TextField label="Функциональное направление" isDisplayText={stateDisplay}
                         value={stateCard.functionalDirection} dispatch={dispatchCard}
                         actionType={'functionalDirection'}
              />
              <div className={classes.rowLine}/>
              <Autocomplete label="Предметная область" isDisplayText={stateDisplay}
                            url={GET_PROJECT_AREA_AUTOCOMPLETE_URL}
                            value={stateCard.projectArea} dispatch={dispatchCard} actionType={'projectArea'}
              />
              <div className={classes.rowLine}/>
              <DatePicker label="Срок завершения проекта" isDisplayText={stateDisplay}
                          value={stateCard.finishingDate} dispatch={dispatchCard} actionType={'finishingDate'}
              />
              <div className={classes.rowLine}/>
              <MultiAutocomplete label="Технологии" valueArray={stateTech} isDisplayText={stateDisplay}
                                 url={GET_TECH_AUTOCOMPLETE_URL}
                                 dispatch={dispatchTech} actionTypeAdd={'technologiesAdd'}
                                 actionTypeDelete={'technologiesDelete'}
              />
            </div>
          </div>
          <div className={classes.cardTab}>
            <div className={classes.columnContainer}>
              <Switch label="Продуктовая разработка" checked={stateTeam.isProductDevelop}
                      actionType="isProductDevelop" dispatch={dispatchTeam} isDisplayText={stateDisplay}
              />
              <div className={classes.rowLine}/>
              <div className={classes.teamContainer}>
                <span style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#878c96',
                  fontFamily: 'Roboto',
                  gridColumn: '1/-1'
                }}>Состав команды</span>
                <NumberField label="Аналитики" isDisplayText={stateDisplay}
                             value={stateTeam.analytics} dispatch={dispatchTeam} actionType={'analytics'}
                />
                <NumberField label="Разработчики" isDisplayText={stateDisplay}
                             value={stateTeam.developers} dispatch={dispatchTeam} actionType={'developers'}
                />
                <NumberField label="Тестировщики" isDisplayText={stateDisplay}
                             value={stateTeam.testers} dispatch={dispatchTeam} actionType={'testers'}
                />
                <NumberField label="Тех. писатели" isDisplayText={stateDisplay}
                             value={stateTeam.techWriters} dispatch={dispatchTeam} actionType={'techWriters'}
                />
                <NumberField label="DevOps" isDisplayText={stateDisplay}
                             value={stateTeam.devOps} dispatch={dispatchTeam} actionType={'devOps'}
                />
                <NumberField label="Дизайнеры" isDisplayText={stateDisplay}
                             value={stateTeam.designers} dispatch={dispatchTeam} actionType={'designers'}
                />
                <div style={{gridColumn: '1/-1'}}>
                  <Switch label="Команда сформирована" checked={stateTeam.isTeamFormed}
                          actionType="isTeamFormed" dispatch={dispatchTeam} isDisplayText={stateDisplay}
                  />
                </div>
                <NumberField label="Общее количество" isDisplayText={stateDisplay}
                             value={stateTeam.teamCount} dispatch={dispatchTeam} actionType={'teamСount'}
                />
                <NumberField label="Стейкхолдеры" isDisplayText={stateDisplay}
                             value={stateTeam.stakeHoldersCount} dispatch={dispatchTeam}
                             actionType={'stakeHoldersCount'}
                />
              </div>
              <div className={classes.rowLine}/>
              <div style={{width: 320}}>
                <TextArea label="Коментарии к команде"
                          value={statePM.comment} dispatch={dispatchPM}
                          actionType={'comment'} rows={2} isDisplayText={stateDisplay}
                />
              </div>
            </div>
            <div className={classes.columnContainer}>
              <TextArea label="Требования к разработчикам" rows={10} isDisplayText={stateDisplay}
                        value={stateTeam.developerRequirements} dispatch={dispatchTeam}
                        actionType={'developerRequirements'}
              />
              <TextArea label="Требования к аналитикам" rows={10} isDisplayText={stateDisplay}
                        value={stateTeam.analyticsRequirements} dispatch={dispatchTeam}
                        actionType={'analyticsRequirements'}
              />
            </div>
            <div className={classes.columnContainer}>
              <Select label="Методология" value={stateTeam.methodology} actionType={'methodology'}
                      isDisplayText={stateDisplay}
                      dispatch={dispatchTeam} selectList={['Agile', 'Waterfall']}
              />
              <div className={classes.rowLine}/>
              <DatePicker label="Дата выхода команды на проект" isDisplayText={stateDisplay}
                          maxDate={stateCard.finishingDate}
                          value={statePM.teamStartDate} dispatch={dispatchPM} actionType={'teamStartDate'}
              />
              <div className={classes.rowLine}/>
              <Select label="Наличие овертаймов" value={statePM.overTime} actionType={'overTime'}
                      isDisplayText={stateDisplay}
                      dispatch={dispatchPM} selectList={['Нет', 'Иногда', 'Постоянно']}
              />
              <div className={classes.rowLine}/>
              <div className={classes.containerComponent}>
                <LocationPicker isOffice={statePM.isOffice} officeLocation={statePM.officeLocation}
                                isDisplayText={stateDisplay}
                                dispatch={dispatchPM} actionTypeRadio="isOffice" actionTypeAutocomlete="officeLocation"
                                error={stateError}
                />
              </div>
              <div className={classes.rowLine}/>
              <div className={classes.containerComponent}>
                <TimeChangePicker label="Возможна работа со сдвигом по времени (время по МСК)"
                                  isTimeChange={statePM.isTimeChange} dayStart={statePM.dayStart}
                                  dayEnd={statePM.dayEnd} dispatch={dispatchPM} actionTypeSwitch={'isTimeChange'}
                                  actionTypeStartDay={'dayStart'} actionTypeEndDay={'dayEnd'}
                                  isDisplayText={stateDisplay}
                />
              </div>
            </div>
          </div>
          <>
            <RecrutingForm isDisplayText={stateDisplay} state={stateRecruting} dispatch={dispatchRecruting}
                           error={stateError}/>
          </>
        </CustomizedTabs>
      </div>
    </div>
  );
}

export default ConnectedProjectCard;