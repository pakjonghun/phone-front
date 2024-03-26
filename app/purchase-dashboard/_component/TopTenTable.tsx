'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { TopRecord } from '@/model/dashboard';
import { getCurrencyToKRW, getTwoRoundedNumber } from '@/util/util';
import { TopPurchase } from '@/hooks/purchaseDashboard/type';

function createData({ name, count, accInPrice }: TopPurchase) {
  return {
    name,
    accInPrice: getCurrencyToKRW(accInPrice),
    count,
  };
}

const header = ['이름', '매입가', '매입수량'];

interface Props {
  title: string;
  data?: TopPurchase[];
}

export default function TopTenTable({ title, data }: Props) {
  const rows = data?.map((item) => createData(item)) ?? [];
  return (
    <Paper sx={{ pt: 3, height: '100%' }}>
      <Typography ml={3} mb={3} variant="h5">
        {title}
      </Typography>
      <Table aria-label="record table">
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
              <TableCell align="left">{row.accInPrice}</TableCell>
              <TableCell align="left">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
