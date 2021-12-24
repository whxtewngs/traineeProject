import * as React from 'react';
import {alpha} from '@mui/lab/node_modules/@mui/system';
import {makeStyles} from '@mui/styles';

import {useAppDispatch} from "../../app/hooks";
import {setFilters} from '../../app/actionCreators';

import {reducer, initialState} from './redusers'
import {
  setProjectStageAction,
  setCreationPeriodAction,
  setProjectNameAction,
  setFirmAction,
  setCreatorNameAction,
  setProjectAreaAction,
  setProjectIdAction
} from './actions';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import TreeItem from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StageFilter from './StageFilter';
import DateFilter from './DateFilter';
import SearchField from './SearchField';
import CircleIcon from '@mui/icons-material/Circle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const useStyles = makeStyles({
  root: {
    width: 272,
    color: 'white',
    display: 'grid',
    gap: 16,
    marginLeft: 50
  },
  item: {
    color: '#b7bfc8',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'medium',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#b7bfc8',
  },
  treeItemLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {
    minWidth: 6,
    minHeight: 6,
    marginRight: 12,
    backgroundColor: '#8f87f3',
    borderRadius: '50%',
    boxShadow: `${alpha('#8f87f3', 0.4)} 0 0 3px 0.1rem`
  }
});

function ConnectedMenuFilters() {
  const reduxDispatch = useAppDispatch();

  const [filters, dispatchFilters] = React.useReducer(reducer, initialState);
  const [expandedFirst, setExpandedFirst] = React.useState<string[]>([]);
  const [expandedSecond, setExpandedSecond] = React.useState<string[]>([]);

  const classes = useStyles();
  const {projectStage, creationPeriod, creatorName, projectArea, projectName, firm, projectId} = filters;

  React.useEffect(
    () => {
      reduxDispatch(setFilters(filters));
    },
    [filters, reduxDispatch]
  );

  const handleToggleTree = (set: React.Dispatch<React.SetStateAction<string[]>>) => (
    (event: React.SyntheticEvent, nodeIds: string[]) => {
      set([nodeIds[0]]);
    }
  );

  const hiddenFirstTree = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLElement)?.localName !== 'body') {
      setExpandedFirst([]);
    }
  };

  const hiddenSecondTree = () => {
    setExpandedSecond([]);
  };

  let filtersActive = false;

  if (
    projectStage !== ''
    ||
    creationPeriod.from !== null
    ||
    creationPeriod.to !== null
  ) {
    filtersActive = true;
  }

  let searchActive = false;

  if (
    creatorName !== ''
    ||
    projectArea !== ''
    ||
    projectName !== ''
    ||
    firm !== ''
  ) {
    searchActive = true;
  }

  const resetFilters = () => {
    dispatchFilters(setProjectStageAction(''));
    dispatchFilters(setCreationPeriodAction(null, null));
  }

  const resetSearch = () => {
    dispatchFilters(setProjectNameAction(''));
    dispatchFilters(setFirmAction(''));
    dispatchFilters(setCreatorNameAction(''));
    dispatchFilters(setProjectAreaAction(''));
    dispatchFilters(setProjectIdAction(''));
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.label}>
          <FilterAltOutlinedIcon fontSize="small" sx={{color: filtersActive ? 'white' : ''}}/>
          <Typography variant={filtersActive ? 'activeLinkh2' : 'h2'} component="div">Фильтры</Typography>
          {filtersActive ?
            <DeleteForeverOutlinedIcon fontSize="small" onClick={resetFilters}
                                       sx={{color: "white", cursor: 'pointer'}}/>
            :
            null
          }
        </div>
        <ClickAwayListener onClickAway={hiddenFirstTree}>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{overflow: 'hidden', width: 227}}
            expanded={expandedFirst}
            onNodeToggle={handleToggleTree(setExpandedFirst)}
            defaultEndIcon={<CircleIcon/>}
            defaultParentIcon={<CircleIcon/>}
          >
            <TreeItem nodeId="1"
                      label={
                        <div className={classes.treeItemLabel}>
                          <Typography variant='h4' color={projectStage ? '#fff' : ''}>Стадия проекта</Typography>
                          <div className={classes.circle}
                               style={{
                                 opacity: projectStage ? 1 : 0,
                               }}
                          />
                        </div>
                      }
            >
              <StageFilter value={filters.projectStage} dispatch={dispatchFilters} action={setProjectStageAction}/>
            </TreeItem>
            <TreeItem nodeId="2" label={
              <div className={classes.treeItemLabel}>
                <Typography
                  variant='h4'
                  color={creationPeriod.from !== null && creationPeriod.to !== null ? '#fff' : ''}
                >
                  Дата создания
                </Typography>
                <div className={classes.circle}
                     style={{
                       opacity: creationPeriod.from !== null && creationPeriod.to !== null ? 1 : 0,
                     }}
                />
              </div>
            }
            >
              <DateFilter value={creationPeriod} dispatch={dispatchFilters} action={setCreationPeriodAction}/>
            </TreeItem>
          </TreeView>
        </ClickAwayListener>
      </div>
      <div className={classes.root}>
        <div className={classes.label}>
          <SearchOutlinedIcon fontSize="small" sx={{color: searchActive ? 'white' : ''}}/>
          <Typography variant={searchActive ? 'activeLinkh2' : 'h2'} component="div">Поиск</Typography>
          {searchActive ?
            <DeleteForeverOutlinedIcon fontSize="small" onClick={resetSearch} sx={{color: "white", cursor: 'pointer'}}/>
            :
            null
          }
        </div>
        <ClickAwayListener onClickAway={hiddenSecondTree}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{overflow: 'hidden', width: 227}}
            expanded={expandedSecond}
            onNodeToggle={handleToggleTree(setExpandedSecond)}
          >
            <TreeItem nodeId="3" label={
              <div className={classes.treeItemLabel}>
                <Typography variant='h4' color={projectId ? '#fff' : ''}>Номер проекта</Typography>
                <div className={classes.circle}
                     style={{
                       opacity: projectId ? 1 : 0,
                     }}
                />
              </div>
            }>
              <SearchField value={projectId} dispatch={dispatchFilters} action={setProjectIdAction}/>
            </TreeItem>
            <TreeItem nodeId="4" label={
              <div className={classes.treeItemLabel}>
                <Typography variant='h4' color={projectName ? '#fff' : ''}>Наименование</Typography>
                <div className={classes.circle}
                     style={{
                       opacity: projectName ? 1 : 0,
                     }}
                />
              </div>
            }>
              <SearchField value={projectName} dispatch={dispatchFilters} action={setProjectNameAction}/>
            </TreeItem>
            <TreeItem nodeId="5" label={
              <div className={classes.treeItemLabel}>
                <Typography variant='h4' color={creatorName ? '#fff' : ''}>Автор</Typography>
                <div className={classes.circle}
                     style={{
                       opacity: creatorName ? 1 : 0,
                     }}
                />
              </div>
            }>
              <SearchField value={creatorName} dispatch={dispatchFilters} action={setCreatorNameAction}/>
            </TreeItem>
            <TreeItem nodeId="6" label={
              <div className={classes.treeItemLabel}>
                <Typography variant='h4' color={firm ? '#fff' : ''}>Заказчик</Typography>
                <div className={classes.circle}
                     style={{
                       opacity: firm ? 1 : 0,
                     }}
                />
              </div>
            }>
              <SearchField value={firm} dispatch={dispatchFilters} action={setFirmAction}/>
            </TreeItem>
            <TreeItem nodeId="7" label={
              <div className={classes.treeItemLabel}>
                <Typography variant='h4' color={projectArea ? '#fff' : ''}>Предметная область</Typography>
                <div className={classes.circle}
                     style={{
                       opacity: projectArea ? 1 : 0,
                     }}
                />
              </div>
            }>
              <SearchField value={projectArea} dispatch={dispatchFilters} action={setProjectAreaAction}/>
            </TreeItem>
          </TreeView>
        </ClickAwayListener>
      </div>
    </>
  );
}

export default ConnectedMenuFilters;