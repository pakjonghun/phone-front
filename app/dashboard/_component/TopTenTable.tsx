'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { TopTenItem } from '@/model/dashboard';
import {
  getCurrencyToKRW,
  getTwoRoundedNumber,
} from '@/util/util';

function createData({
  name,
  accMargin,
  accPrice,
  marginRate,
}: TopTenItem) {
  return {
    name,
    accMargin: getCurrencyToKRW(accMargin),
    accPrice: getCurrencyToKRW(accPrice),
    marginRate: `${getTwoRoundedNumber(marginRate)}%`,
  };
}

const header = ['이름', '누적 매출', '누적 마진', '마진율'];

interface Props {
  title: string;
  data: TopTenItem[];
}

export default function TopTenTable({
  title,
  data,
}: Props) {
  const rows = data.map((item) => createData(item));
  return (
    <Paper sx={{ pt: 3, height: '100%' }}>
      <Typography ml={3} mb={3} variant="h5">
        {title}
      </Typography>
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
