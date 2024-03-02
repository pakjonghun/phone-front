import * as React from 'react';
import { Box, Typography } from '@mui/material';
import SearchFilter from './SearchFilter';
import UploadExcel from './UploadExcel';
import SaleTableMain from './TableMain';

export default function SaleTable() {
  return (
    <>
      <Box
        sx={{
          mt: 2,
          ml: 'auto',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <UploadExcel sx={{ ml: 'auto' }} />
      </Box>
      <SearchFilter />
      <SaleTableMain />
    </>
  );
}
