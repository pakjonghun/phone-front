import { Skeleton } from '@mui/material';
import React from 'react';

const CardSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      height={'130px'}
      width={'100%'}
    />
  );
};

export default CardSkeleton;
