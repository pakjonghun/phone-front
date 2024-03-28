import { Box, Stack } from '@mui/material';
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
        alignItems: 'fleXStart',
        gap: {
          xs: 2,
        },
        py: 3,
        borderRadius: '10px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
        <SearchKeyword />
      </Stack>
    </Box>
  );
};

export default SearchFilter;
