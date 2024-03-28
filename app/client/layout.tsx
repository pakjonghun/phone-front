'use client';

import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import CommonLayout from '@/components/commonLayout/CommonLayout';
import NavTabs from './_component/ClientNav';

interface Props {
  children: React.ReactNode;
}

const Search: FC<Props> = ({ children }) => {
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
        <Typography variant="h4">거래처 검색</Typography>
      </Box>

      <Box sx={{ minWidth: '930px' }}>
        <NavTabs />
        {children}
      </Box>
    </CommonLayout>
  );
};

export default Search;
