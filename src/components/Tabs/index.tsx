import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { primaryColor } from '../palette';
import Badge from '@mui/material/Badge';

interface StyledTabsProps {
  children?: React.ReactNode;
  icon?: Element;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 2}}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  maxHaight: 48,
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    //backgroundColor: '#635ee7',
    backgroundColor: primaryColor,
  },
});

interface StyledTabProps {
  label: string;
  icon?: string | React.ReactElement;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  minHeight: 48,
  overflow: 'visible',
  textTransform: 'none',
  //fontWeight: theme.typography.fontWeightRegular,
  fontWeight: 600,
  fontSize: 16,
  marginRight: theme.spacing(1),
  color: '#878c96',
  '&.MuiTab-root': {
    marginRight: 20,
    minWidth: 0,
    padding: 0,
  },
  '&.Mui-selected': {
    color: '#8f87f3',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

interface IProps {
  errorArray: boolean[]
  children: React.ReactChild[]
  showRecrutTab: boolean
}

export default function CustomizedTabs({
  errorArray, 
  children, 
  showRecrutTab
  }: IProps
) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
      >
        <StyledTab label="Проект" icon={errorArray[0] ? <Badge variant="dot" color="error"/> : undefined} />
        <StyledTab label="Команда" icon={errorArray[1] ? <Badge variant="dot" color="error"/> : undefined} />
        {showRecrutTab && <StyledTab label="Подбор" icon={errorArray[2] ? <Badge variant="dot" color="error"/> : undefined} />}
      </StyledTabs>
      <TabPanel value={value} index={0}>
        {children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {children[1]}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {children[2]}
      </TabPanel>
    </div>
  );
}