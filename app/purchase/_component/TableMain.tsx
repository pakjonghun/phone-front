'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';
import { usePurchaseList } from '@/hooks/search/purchase/usePurchase';
import { CircularProgress } from '@mui/material';
import useInfinity from '@/hooks/common/useInfinity';
import EnhancedTableHead from './TableHeader';
import EnhancedTableToolbar from './ToolBar';
import TableBodyList from './TableBody';
import { usePurchaseTable } from '@/lib/store/purchase/purchaseTable';

export default function PurchaseTableMain() {
  const keyword = usePurchaseQueryStore((state) => state.keyword);
  const sort = usePurchaseQueryStore((state) => state.sort);
  const length = usePurchaseQueryStore((state) => state.length);
  const startDate = usePurchaseQueryStore((state) => state.startDate);

  const endDate = usePurchaseQueryStore((state) => state.endDate);
  const { data, hasNextPage, fetchNextPage, isFetching } = usePurchaseList({
    keyword,
    sort,
    length: length,
    startDate,
    endDate,
  });

  const callback: IntersectionObserverCallback = (entry) => {
    if (hasNextPage && !isFetching && entry[0].isIntersecting) {
      fetchNextPage();
    }
  };

  const setLastItemRef = useInfinity({ callback });

  const flatPurchaseData = data?.pages.flatMap((item) => item.data);

  const handleSelectAllClick = usePurchaseTable((state) => state.handleSelectAllClick);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar searchDataCount={flatPurchaseData?.length ?? 0} />
      <TableContainer
        sx={{
          maxHeight: 800,
          height: 800,
        }}
      >
        <Table stickyHeader aria-labelledby="tableTitle">
          <EnhancedTableHead
            onSelectAllClick={() => handleSelectAllClick(flatPurchaseData ?? [])}
            rowCount={flatPurchaseData?.length ?? 0}
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
          {isFetching && <CircularProgress color="primary" />}
        </Box>
      </TableContainer>
    </Paper>
  );
}
