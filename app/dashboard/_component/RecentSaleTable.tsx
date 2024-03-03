import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { RecentSale } from '@/model/dashboard';
import { getCurrencyToKRW } from '../util';

function createData(
  name: string,
  date: string,
  client: number
) {
  return { name, date, client: getCurrencyToKRW(client) };
}

const header = ['상품', '거래처', '판매가'];

interface Props {
  title: string;
  data: RecentSale[];
}

export default function RecentSaleTable({
  title,
  data,
}: Props) {
  const rows = data.map((item) =>
    createData(item.product, item.outClient, item.outPrice)
  );

  return (
    <Paper sx={{ pt: 3 }}>
      <Typography ml={3} mb={3} variant="h5">
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
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
