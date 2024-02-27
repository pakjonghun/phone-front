'use client';

import SaleTable from '@/app/search/_component/SaleTable/SaleTable';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Search = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (_: any, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'space-between',
        }}
      >
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="판매" {...a11yProps(0)} />
          <Tab label="매입" {...a11yProps(1)} />
        </Tabs>
      </Stack>
      <TabPanel value={selectedTab} index={0}>
        <SaleTable />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        gg
      </TabPanel>
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
