import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Aggregate, RecentSale } from '@/model/dashboard';

function createData(
  name: string,
  date: number,
  client: number
) {
  return { name, date, client };
}

const header = ['거래처', '건수', '누적가격'];

interface Props {
  title: string;
  data: Aggregate[];
}

export default function TopTenClient({
  title,
  data,
}: Props) {
  const rows = data.map((item) =>
    createData(item._id, item.accPrice, item.accPrice)
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
