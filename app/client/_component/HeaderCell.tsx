import React, { FC } from 'react';
import { Button, TableCell, Typography } from '@mui/material';
import { HeadCell } from './constant';
import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';
import { PurchaseSort } from '@/hooks/search/purchase/type';
import HeadSortIcon from './HeadSortIcon';

interface Props {
  headCell: HeadCell;
}

const HeaderCell: FC<Props> = ({ headCell }) => {
  const setSortList = usePurchaseQueryStore((state) => state.setSort);

  const sortItem = usePurchaseQueryStore((state) => state.getSort(headCell.id));
  const orderValue = sortItem?.[1];
  const handleClickHeader = (headerId: PurchaseSort) => {
    setSortList([headerId, orderValue === 1 ? -1 : 1]);
  };

  return (
    <TableCell
      key={headCell.id}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sx={{ minWidth: `${headCell.width ?? 50}px` }}
    >
      {headCell.sort ? (
        <Button
          color="inherit"
          variant="text"
          sx={{
            justifyContent: 'flex-start',
            width: '100%',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          onClick={() => handleClickHeader(headCell.id as unknown as PurchaseSort)}
        >
          {headCell.label}
          <HeadSortIcon orderValue={orderValue} />
        </Button>
      ) : (
        <Typography
          variant="button"
          color="inherit"
          sx={{
            width: '100%',
            whiteSpace: 'nowrap',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {headCell.label}
        </Typography>
      )}
    </TableCell>
  );
};

export default HeaderCell;
