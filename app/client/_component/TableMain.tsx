'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useClientQueryStore } from '@/lib/store/client/clientList';
import { useClientList } from '@/hooks/search/client/useClient';
import { CircularProgress } from '@mui/material';
import useInfinity from '@/hooks/common/useInfinity';
import EnhancedTableHead from './TableHeader';
import EnhancedTableToolbar from './ToolBar';
import TableBodyList from './TableBody';
import { useClientTable } from '@/lib/store/client/clientTable';
import { useDebounce } from '@/hooks/common/useDebounce';

export default function ClientTableMain() {
  const keyword = useClientQueryStore((state) => state.keyword);
  const length = useClientQueryStore((state) => state.length);
  const delayText = useDebounce({ text: keyword });

  const { data, hasNextPage, fetchNextPage, isFetching } = useClientList({
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

  const handleSelectAllClick = useClientTable((state) => state.handleSelectAllClick);

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
