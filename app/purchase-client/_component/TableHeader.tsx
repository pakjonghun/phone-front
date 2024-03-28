import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { headCells } from './constant';
import HeaderCell from './HeaderCell';

interface EnhancedTableProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow sx={{ height: '100px' }}>
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
