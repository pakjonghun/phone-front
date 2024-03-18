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
import {
  getCurrencyToKRW,
  getTwoRoundedNumber,
} from '@/util/util';

function createData({
  name,
  accMargin,
  accOutPrice,
  accMarginRate,
}: TopRecord) {
  return {
    name,
    accMargin: getCurrencyToKRW(accMargin),
    accPrice: getCurrencyToKRW(accOutPrice),
    marginRate: `${getTwoRoundedNumber(accMarginRate)}%`,
  };
}

const header = ['이름', '매출', '수익', '수익율'];

interface Props {
  title: string;
  data?: TopRecord[];
}

export default function TopTenTable({
  title,
  data,
}: Props) {
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
              <TableCell align="left">
                {row.accPrice}
              </TableCell>
              <TableCell align="left">
                {row.accMargin}
              </TableCell>
              <TableCell align="left">
                {row.marginRate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
