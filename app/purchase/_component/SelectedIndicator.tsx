import { usePurchaseTable } from '@/lib/store/purchase/purchaseTable';
import { Typography } from '@mui/material';
import React from 'react';

const SelectedIndicator = () => {
  const selectedPurchaseList = usePurchaseTable((state) => state.selectedPurchaseList);

  return (
    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
      {selectedPurchaseList.length}개 데이터가 선택되었습니다.
    </Typography>
  );
};

export default SelectedIndicator;
