'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import SearchFilter from './_component/SearchFilter';
import UploadExcel from './_component/UploadExcel';
import SaleTableMain from './_component/TableMain';

export default function PurchaseTable() {
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
        <Typography variant="h4">매입 검색</Typography>
        <UploadExcel sx={{ ml: 'auto' }} />
      </Box>
      <SearchFilter />
      <SaleTableMain />
    </>
  );
}
