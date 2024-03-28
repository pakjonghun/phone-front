import React, { FC } from 'react';
import { Stack, TableCell, Typography } from '@mui/material';
import { HeadCell } from './constant';

interface Props {
  headCell: HeadCell;
}

const HeaderCell: FC<Props> = ({ headCell }) => {
  return (
    <TableCell
      key={headCell.id}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sx={{ minWidth: `${headCell.width ?? 50}px` }}
    >
      <Typography
        variant="button"
        color="inherit"
        sx={{
          width: '100%',
          whiteSpace: 'nowrap',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {headCell.label}
      </Typography>
    </TableCell>
  );
};

export default HeaderCell;
