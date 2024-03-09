'use client';

import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import CommonLayout from '@/components/commonLayout/CommonLayout';
import UploadExcel from './_component/UploadExcel';

interface Props {
  children: React.ReactNode;
}

type Tab = 0 | 1;

const Search: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  const route = useRouter();

  return (
    <CommonLayout>
      <Box
        sx={{
          my: 4,
          ml: 'auto',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">판매 검색</Typography>
        <UploadExcel sx={{ ml: 'auto' }} />
      </Box>
      <Stack
        direction="row"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'space-between',
        }}
      >
        <Tabs value={pathname}>
          <Tab
            value={'/sale'}
            label="최고/최저가 비교"
            {...a11yProps('/sale')}
            onClick={() => route.push('/sale')}
          />

          <Tab
            value={'/sale/margin'}
            label="마진율 비교"
            {...a11yProps('/sale/margin')}
            onClick={() => route.push('/sale/margin')}
          />
        </Tabs>
      </Stack>
      <Box sx={{ minWidth: '930px' }}>{children}</Box>
    </CommonLayout>
  );
};

export default Search;

function a11yProps(pathname: string) {
  return {
    id: `vertical-tab-${pathname}`,
    'aria-controls': `vertical-tabpanel-${pathname}`,
  };
}
