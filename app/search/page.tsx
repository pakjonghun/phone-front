'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import SearchFilter from './_component/SearchFilter';
import UploadExcel from './_component/UploadExcel';
import SaleTableMain from './_component/TableMain';

export default function SaleTable() {
  return (
    <>
      <Box
        sx={{
          mt: 4,
          ml: 'auto',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">판매 검색</Typography>
        <UploadExcel sx={{ ml: 'auto' }} />
      </Box>
      <SearchFilter />
      <SaleTableMain />
    </>
  );
}
