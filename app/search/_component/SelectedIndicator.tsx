import { useSaleTable } from '@/lib/store/sale/saleTable';
import { Typography } from '@mui/material';
import React from 'react';

const SelectedIndicator = () => {
  const selectedSaleList = useSaleTable(
    (state) => state.selectedSaleList
  );

  return (
    <Typography
      sx={{ flex: '1 1 100%' }}
      color="inherit"
      variant="subtitle1"
      component="div"
    >
      {selectedSaleList.length}개 데이터가 선택되었습니다.
    </Typography>
  );
};

export default SelectedIndicator;
