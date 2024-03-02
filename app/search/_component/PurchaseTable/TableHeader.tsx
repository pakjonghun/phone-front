import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { headCells } from './constant';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Role } from '@/model/user';
import HeaderCell from './HeaderCell';
import { usePurchaseTable } from '@/lib/store/purchase/purchaseTable';

interface EnhancedTableProps {
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  rowCount: number;
}

export default function EnhancedTableHead(
  props: EnhancedTableProps
) {
  const { onSelectAllClick, rowCount } = props;
  const selectPurchaseList = usePurchaseTable(
    (state) => state.selectedPurchaseList
  );
  const numSelected = selectPurchaseList.length;

  const role = useAuthStore((state) => state.role);

  return (
    <TableHead>
      <TableRow sx={{ height: '80px' }}>
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
          return (
            <HeaderCell
              key={`${headCell.id}_${headCell.label}_${headCell.numeric}`}
              headCell={headCell}
            />
          );
        })}
      </TableRow>
    </TableHead>
  );
}
