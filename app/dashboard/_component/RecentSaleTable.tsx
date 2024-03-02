import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function createData(
  name: string,
  date: string,
  client: string
) {
  return { name, date, client };
}

const rows = [
  createData('겔럭시', '2024-10-10', '농심'),
  createData('겔럭시', '2024-10-10', '농심'),
  createData('겔럭시', '2024-10-10', '농심'),
  createData('겔럭시', '2024-10-10', '농심'),
  createData('겔럭시', '2024-10-10', '농심'),
];

const header = ['이름', '날짜', '거래처'];

export default function RecentSaleTable() {
  return (
    <Paper>
      <Typography mb={3} variant="h5">
        테이블 제목
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {header.map((head) => (
                <TableCell key={head}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {row.date}
                </TableCell>
                <TableCell align="left">
                  {row.client}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
