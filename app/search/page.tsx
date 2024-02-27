'use client';

import SaleTable from '@/app/search/_component/SaleTable/SaleTable';
import {
  Box,
  Stack,
  Tab,
  Tabs,
  styled,
} from '@mui/material';
import React, { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    // <Container
    //   sx={{
    //     width: '100%',
    //     bgColor: 'red',
    //     flex: 1,
    //     bgcolor: 'black',
    //   }}
    //   role="tabpanel"
    //   hidden={value !== index}
    //   id={`vertical-tabpanel-${index}`}
    //   aria-labelledby={`vertical-tab-${index}`}
    //   {...other}
    // >
    <>
      {value === index && (
        <Box
          sx={{
            // flex: 1,
            width: '100%',
            height: '100%',
            // bgcolor: 'yellow',
          }}
        >
          {children}
        </Box>
      )}
    </>
    // </Container>
  );
}

const Search = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (_: any, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'blue',
      }}
    >
      <Stack
        direction="row"
        sx={{
          // height: '100%',
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
        >
          <Tab label="판매" {...a11yProps(0)} />
          <Tab label="매입" {...a11yProps(1)} />
        </Tabs>
      </Stack>
      {selectedTab === 0 && (
        <TabPanel value={selectedTab} index={0}>
          <SaleTable />
        </TabPanel>
      )}
      {selectedTab === 1 && (
        <TabPanel value={selectedTab} index={1}>
          gg
        </TabPanel>
      )}
    </Box>
  );
};

export default Search;

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
