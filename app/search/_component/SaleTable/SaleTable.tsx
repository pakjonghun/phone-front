import * as React from 'react';
import { Box } from '@mui/material';
import { useSnackbar } from '@/context/SnackBarProvicer';
import SearchFilter from './SearchFilter';
import UploadExcel from './UploadExcel';
import SaleTableMain from './TableMain';

export default function SaleTable() {
  return (
    <Box sx={{}}>
      <Box sx={{ ml: 'auto', textAlign: 'right' }}>
        <UploadExcel sx={{ ml: 'auto' }} />
      </Box>
      <SearchFilter />
      <SaleTableMain />
    </Box>
  );
}
