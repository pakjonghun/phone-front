'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { usePurchaseClientList } from '@/hooks/search/client/useClient';
import { CircularProgress } from '@mui/material';
import useInfinity from '@/hooks/common/useInfinity';
import EnhancedTableHead from './TableHeader';
import EnhancedTableToolbar from './ToolBar';
import TableBodyList from './TableBody';
import { useDebounce } from '@/hooks/common/useDebounce';
import { usePurchaseClientQueryStore } from '@/lib/store/purchaseClient/purchaseClientList';
import { usePurchaseClientTable } from '@/lib/store/purchaseClient/purchaseClientTable';

export default function ClientTableMain() {
  const keyword = usePurchaseClientQueryStore((state) => state.keyword);
  const length = usePurchaseClientQueryStore((state) => state.length);
  const delayText = useDebounce({ text: keyword });

  const { data, hasNextPage, fetchNextPage, isFetching } = usePurchaseClientList({
    keyword: delayText,
    length: length,
  });

  const callback: IntersectionObserverCallback = (entry) => {
    if (hasNextPage && !isFetching && entry[0].isIntersecting) {
      fetchNextPage();
    }
  };

  const setLastItemRef = useInfinity({ callback });

  const flatClientData = data?.pages.flatMap((item) => item.data);

  const handleSelectAllClick = usePurchaseClientTable((state) => state.handleSelectAllClick);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar searchDataCount={flatClientData?.length ?? 0} />
      <TableContainer
        sx={{
          maxHeight: 800,
          height: 800,
        }}
      >
        <Table stickyHeader aria-labelledby="tableTitle">
          <EnhancedTableHead
            onSelectAllClick={() => handleSelectAllClick(flatClientData ?? [])}
            rowCount={flatClientData?.length ?? 0}
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
