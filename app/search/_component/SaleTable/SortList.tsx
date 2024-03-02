import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { sortEngToHangle } from '@/hooks/search/sale/constant';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

const SortList = () => {
  const sortList = useSaleQueryStore((state) => state.sort);
  const reSetSort = useSaleQueryStore(
    (state) => state.resetSort
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        mt: 3,
        height: '94px',
      }}
    >
      {sortList.map(([sortKey, order], index) => (
        <Chip
          onDelete={() => reSetSort(sortKey)}
          avatar={<Avatar>{index + 1}</Avatar>}
          size="small"
          key={`${index}_order_sortKey`}
          label={
            <Stack alignItems="center" direction="row">
              <Typography>{`${sortEngToHangle[sortKey]}`}</Typography>
              {order == 1 ? (
                <ArrowUpwardIcon
                  sx={{ fontSize: '16px' }}
                />
              ) : (
                <ArrowDownwardIcon
                  sx={{ fontSize: '16px' }}
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
