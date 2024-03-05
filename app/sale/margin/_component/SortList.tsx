import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useMarginQueryStore } from '@/lib/store/sale/marginList';
import { sortEngToHangle } from '@/hooks/search/margin/constant';

const SortList = () => {
  const sortList = useMarginQueryStore(
    (state) => state.sort
  );
  const reSetSort = useMarginQueryStore(
    (state) => state.resetSort
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mt: 1,
        height: '30px',
      }}
    >
      {sortList.map(([sortKey, order], index) => (
        <Chip
          size="medium"
          onDelete={() => reSetSort(sortKey)}
          avatar={<Avatar>{index + 1}</Avatar>}
          key={`${index}_order_sortKey`}
          label={
            <Stack alignItems="center" direction="row">
              <Typography>{`${sortEngToHangle[sortKey]}`}</Typography>
              {order == 1 ? (
                <ArrowUpwardIcon
                  sx={{ fontSize: '14px' }}
                />
              ) : (
                <ArrowDownwardIcon
                  sx={{ fontSize: '14px' }}
                />
              )}
            </Stack>
          }
        />
      ))}
    </Box>
  );
};

export default SortList;
