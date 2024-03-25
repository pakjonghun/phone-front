import { Skeleton } from '@mui/material';
import React from 'react';

const TableSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      height={'650px'}
      width={'100%'}
    />
  );
};

export default TableSkeleton;
