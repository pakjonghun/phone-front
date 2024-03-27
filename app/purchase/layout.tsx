'use client';

import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import CommonLayout from '@/components/commonLayout/CommonLayout';
import UploadExcel from './_component/UploadExcel';

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
        <Typography variant="h4">매입 검색</Typography>
        <UploadExcel sx={{ ml: 'auto' }} />
      </Box>
      <Box sx={{ minWidth: '930px' }}>{children}</Box>
    </CommonLayout>
  );
};

export default Search;
