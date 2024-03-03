'use client';

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React, { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import CommonLayout from '@/components/commonLayout/CommonLayout';

interface Props {
  children?: React.ReactNode;
}

type Tab = 0 | 1;

const Search: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  const route = useRouter();

  return (
    <CommonLayout>
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
            value={'/search'}
            label="판매"
            {...a11yProps('/search')}
            onClick={() => route.push('/search')}
          />

          <Tab
            value={'/search/purchase'}
            label="매입"
            {...a11yProps('/search/purchase')}
            onClick={() => route.push('/search/purchase')}
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
