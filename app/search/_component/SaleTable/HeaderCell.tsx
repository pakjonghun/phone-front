import React, { FC } from 'react';
import {
  Button,
  TableCell,
  TableHead,
} from '@mui/material';

import { HeadCell } from './constant';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { SaleSort } from '@/hooks/search/sale/type';
import HeadSortIcon from './HeadSortIcon';

interface Props {
  headCell: HeadCell;
}

const HeaderCell: FC<Props> = ({ headCell }) => {
  const setSortList = useSaleQueryStore(
    (state) => state.setSort
  );

  const sortItem = useSaleQueryStore((state) =>
    state.getSort(headCell.id)
  );
  const orderValue = sortItem?.[1];
  const handleClickHeader = (headerId: SaleSort) => {
    setSortList([headerId, orderValue === 1 ? -1 : 1]);
  };

  return (
    <TableCell
      key={headCell.id}
      align="left"
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sx={{ width: `${headCell.width ?? 50}px` }}
    >
      <Button
        color="inherit"
        variant="text"
        sx={{
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        onClick={() => handleClickHeader(headCell.id)}
      >
        {headCell.label}
        <HeadSortIcon orderValue={orderValue} />
      </Button>
    </TableCell>
  );
};

export default HeaderCell;
