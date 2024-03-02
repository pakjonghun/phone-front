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
import PurchaseTable from './_component/PurchaseTable/PurchaseTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return <>{value === index && <Box>{children}</Box>}</>;
}

type Tab = 0 | 1;

const Search = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(0);
  const handleChangeTab = (_: any, newValue: Tab) => {
    setSelectedTab(newValue);
  };

  const TabMapper = {
    0: <SaleTable />,
    1: <PurchaseTable />,
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
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
        >
          <Tab label="판매" {...a11yProps(0)} />
          <Tab label="매입" {...a11yProps(1)} />
        </Tabs>
      </Stack>
      <Box sx={{ minWidth: '930px' }}>
        {TabMapper[selectedTab]}
      </Box>
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
