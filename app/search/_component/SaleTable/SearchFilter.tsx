import { Box } from '@mui/material';
import React from 'react';
import SearchKeyword from './SearchKeyword';
import SaleSort from './SortSelect';

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
        mt: 8,
        gap: {
          xs: 2,
        },
        p: 3,
        borderRadius: '10px',
      }}
    >
      <SearchKeyword />
      <SaleSort />
    </Box>
  );
};

export default SearchFilter;
