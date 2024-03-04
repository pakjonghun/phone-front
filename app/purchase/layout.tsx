'use client';

import React, { FC } from 'react';
import { Box } from '@mui/material';
import CommonLayout from '@/components/commonLayout/CommonLayout';

interface Props {
  children?: React.ReactNode;
}

const Search: FC<Props> = ({ children }) => {
  return (
    <CommonLayout>
      <Box sx={{ minWidth: '930px' }}>{children}</Box>
    </CommonLayout>
  );
};

export default Search;
