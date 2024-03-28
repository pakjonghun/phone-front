import { usePurchaseClientTable } from '@/lib/store/purchaseClient/purchaseClientTable';
import { Typography } from '@mui/material';
import React from 'react';

const SelectedIndicator = () => {
  const selectedClientList = usePurchaseClientTable((state) => state.selectedPurchaseClientList);

  return (
    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
      {selectedClientList.length}개 데이터가 선택되었습니다.
    </Typography>
  );
};

export default SelectedIndicator;
