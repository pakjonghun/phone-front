import { Box } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  a: any[];
}

const A: FC<Props> = ({ a }) => {
  console.log(a.length);
  return (
    <Box
      sx={{
        ml: 20,
        bgcolor: 'red',
        width: 100,
        height: 100,
        color: 'white',
      }}
    >
      {a.length}
    </Box>
  );
};

export default A;
