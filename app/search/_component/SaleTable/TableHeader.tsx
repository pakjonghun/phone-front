import TocIcon from '@mui/icons-material/Toc';
import ClearIcon from '@mui/icons-material/Clear';
import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { SaleSort } from '@/hooks/search/sale/type';
import { Order } from './type';
import { headCells } from './constant';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Role } from '@/model/user';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { canSortList } from '@/hooks/search/sale/constant';
import { Button, Stack, Tooltip } from '@mui/material';
import GradingIcon from '@mui/icons-material/Grading';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  rowCount: number;
}

export default function EnhancedTableHead(
  props: EnhancedTableProps
) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  const sortList = useSaleQueryStore((state) => state.sort);
  const setSortList = useSaleQueryStore(
    (state) => state.setSort
  );

  const role = useAuthStore((state) => state.role);

  const handleClickHeader = (
    headerId: SaleSort,
    order?: 1 | -1
  ) => {
    setSortList([headerId, order === 1 ? -1 : 1]);
  };

  return (
    <TableHead>
      <TableRow>
        {role !== Role.STAFF && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={
                numSelected > 0 && numSelected < rowCount
              }
              checked={
                rowCount > 0 && numSelected === rowCount
              }
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => {
          const targetSort = sortList.find(
            ([sortKey]) => sortKey === headCell.id
          );

          const order = targetSort?.[1];

          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding={
                headCell.disablePadding ? 'none' : 'normal'
              }
              sx={{ width: `${headCell.width ?? 50}px` }}
            >
              <Button
                color="inherit"
                variant="text"
                sx={{
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() =>
                  handleClickHeader(headCell.id, order)
                }
              >
                <TableHead sx={{ mr: 1 }}>
                  {headCell.label}
                </TableHead>
                {!order && (
                  <Tooltip title="정렬">
                    <TocIcon
                      sx={{
                        cursor: 'pointer',
                        fontSize: '18px',
                      }}
                    />
                  </Tooltip>
                )}
                {order == -1 && (
                  <Tooltip title="내림차순">
                    <ArrowDownwardIcon
                      sx={{
                        cursor: 'pointer',
                        fontSize: '18px',
                      }}
                    />
                  </Tooltip>
                )}
                {order == 1 && (
                  <Tooltip title="오름차순">
                    <ArrowUpwardIcon
                      sx={{
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                )}
              </Button>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
