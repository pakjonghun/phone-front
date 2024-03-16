import { Box } from '@mui/material';
import React from 'react';
import SearchKeyword from './SearchKeyword';

const SearchFilter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: 'flexStart',
        gap: {
          xs: 2,
        },
        py: 3,
        borderRadius: '10px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <SearchKeyword />
      </Box>
    </Box>
  );
};

export default SearchFilter;
