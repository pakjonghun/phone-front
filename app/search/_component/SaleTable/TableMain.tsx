import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { useSaleList } from '@/hooks/search/sale/useSaleData';
import {
  CircularProgress,
  Skeleton,
  TableCell,
  TableRow,
} from '@mui/material';
import useInfinity from '@/hooks/common/useInfinity';
import EnhancedTableHead from './TableHeader';
import EnhancedTableToolbar from './ToolBar';
import TableBodyList from './TableBody';
import { useSaleTable } from '@/lib/store/sale/saleTable';

export default function SaleTableMain() {
  const keyword = useSaleQueryStore(
    (state) => state.keyword
  );
  const sort = useSaleQueryStore((state) => state.sort);
  const length = useSaleQueryStore((state) => state.length);
  const { data, hasNextPage, fetchNextPage, isLoading } =
    useSaleList({
      keyword,
      sort,
      length: length,
    });

  const callback: IntersectionObserverCallback = (
    entry
  ) => {
    if (
      hasNextPage &&
      !isLoading &&
      entry[0].isIntersecting
    ) {
      fetchNextPage();
    }
  };

  const setLastItemRef = useInfinity({ callback });

  const flatSaleData = data?.pages.flatMap(
    (item) => item.data
  );

  const handleSelectAllClick = useSaleTable(
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
          {isLoading && <CircularProgress color="info" />}
        </Box>
      </TableContainer>
    </Paper>
  );
}
