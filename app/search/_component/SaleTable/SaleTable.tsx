import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Sale } from '@/model/sale';
import { SaleColumns } from './column';
import {
  Box,
  Button,
  Collapse,
  ListItem,
  Select,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import {
  useSaleList,
  useUploadSaleExcel,
} from '@/hooks/search/sale/useSaleData';
import UploadFileButton from '@/components/button/UploadButton';
import { useSnackbar } from '@/context/SnackBarProvicer';
import SearchFilter from './SearchFilter';

const saleList: Sale[] = [
  {
    isConfirmed: true,
    modelNumber: 'X123',
    rank: 'A',
    distanceLog: '150km',
    recentHighSalePrice: 500,
    recentLowPrice: 450,
    belowAverageCount: 2,
  },
  {
    isConfirmed: false,
    modelNumber: 'Y456',
    rank: 'B',
    distanceLog: null,
    recentHighSalePrice: 400,
    recentLowPrice: 350,
    belowAverageCount: 3,
  },
  {
    isConfirmed: true,
    modelNumber: 'Z789',
    rank: 'S',
    distanceLog: '200km',
    recentHighSalePrice: 600,
    recentLowPrice: 550,
    belowAverageCount: 1,
  },
  {
    isConfirmed: false,
    modelNumber: 'W101',
    rank: 'C',
    distanceLog: '100km',
    recentHighSalePrice: 300,
    recentLowPrice: 250,
    belowAverageCount: 4,
  },
  {
    isConfirmed: true,
    modelNumber: 'Q202',
    rank: 'A',
    distanceLog: '250km',
    recentHighSalePrice: 700,
    recentLowPrice: 650,
    belowAverageCount: 0,
  },
];

export default function SaleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useSaleList();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    columns: SaleColumns,
    data: saleList,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => [],
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <SearchFilter />
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableCell
                      sortDirection="desc"
                      key={headerGroup.id}
                      align={'center'}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <TableSortLabel
                        active
                        direction="desc"
                        onClick={() => {}}
                      />
                    </TableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <>
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} align="center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse in={false} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            History
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">
                                  Total price ($)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {/* {row.history.map((historyRow) => (
                              <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">
                                  {historyRow.date}
                                </TableCell>
                                <TableCell>{historyRow.customerId}</TableCell>
                                <TableCell align="right">
                                  {historyRow.amount}
                                </TableCell>
                                <TableCell align="right">
                                  {Math.round(
                                    historyRow.amount * row.price * 100
                                  ) / 100}
                                </TableCell>
                              </TableRow>
                            ))} */}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={saleList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
