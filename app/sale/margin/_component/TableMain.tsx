'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useMarginList } from '@/hooks/search/sale/useSaleData';
import { CircularProgress } from '@mui/material';
import useInfinity from '@/hooks/common/useInfinity';
import EnhancedTableHead from './TableHeader';
import EnhancedTableToolbar from './ToolBar';
import TableBodyList from './TableBody';
import { useMarginQueryStore } from '@/lib/store/sale/marginList';
import { useMarginTable } from '@/lib/store/sale/marginTable';

export default function MarginTableMain() {
  const keyword = useMarginQueryStore(
    (state) => state.keyword
  );
  const sort = useMarginQueryStore((state) => state.sort);
  const length = useMarginQueryStore(
    (state) => state.length
  );
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useMarginList({
      keyword,
      sort,
      length: length,
    });

  const callback: IntersectionObserverCallback = (
    entry
  ) => {
    if (
      hasNextPage &&
      !isFetching &&
      entry[0].isIntersecting
    ) {
      fetchNextPage();
    }
  };

  const setLastItemRef = useInfinity({ callback });

  const flatSaleData = data?.pages.flatMap(
    (item) => item.data
  );

  const handleSelectAllClick = useMarginTable(
    (state) => state.handleSelectAllClick
  );

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar
        searchDataCount={flatSaleData?.length ?? 0}
      />
      <TableContainer
        sx={{
          maxHeight: 800,
          height: 800,
        }}
      >
        <Table stickyHeader aria-labelledby="tableTitle">
          <EnhancedTableHead
            onSelectAllClick={() =>
              handleSelectAllClick(flatSaleData ?? [])
            }
            rowCount={flatSaleData?.length ?? 0}
          />

          <TableBodyList />
        </Table>
        <Box
          ref={setLastItemRef}
          sx={{
            minHeight: 50,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isFetching && (
            <CircularProgress color="primary" />
          )}
        </Box>
      </TableContainer>
    </Paper>
  );
}
