import { Sale } from '@/model/sale';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@mui/material';

const columnHelper = createColumnHelper<Sale>();

export const SaleColumns = [
  columnHelper.display({
    id: 'selectRow',
    header: ({ table }) => (
      // <Checkbox
      //   color="primary"
      //   checked={table.getIsAllRowsSelected()}
      //   indeterminate={table.getIsSomeRowsSelected()}
      //   onChange={table.getToggleAllRowsSelectedHandler()}
      // />
      <></>
    ),
    cell: ({ row }) => {
      return (
        // <Checkbox
        //   color="primary"
        //   checked={row.getIsSelected()}
        //   indeterminate={row.getIsSomeSelected()}
        //   onChange={row.getToggleSelectedHandler}
        // />
        <></>
      );
    },
  }),
  columnHelper.display({
    id: 'isConfirmed',
    header: '관리자 승인',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isConfirmed ? 'true' : 'false'}
        </div>
      );
    },
  }),

  columnHelper.display({
    id: 'rank',
    header: '등급',
    cell: ({ row }) => {
      return <div>{row.original.rank}</div>;
    },
  }),
  columnHelper.display({
    id: 'distanceLog',
    header: '차감내역',
    cell: ({ row }) => {
      return (
        <div>{row.original.distanceLog ?? 'none'}</div>
      );
    },
  }),
  columnHelper.display({
    id: 'recentHighSalePrice',
    header: '최근 고가 판매가',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.product.recentHighSalePrice}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'recentRowPrice',
    header: '최근 저가 판매가',
    cell: ({ row }) => {
      return (
        <div>{row.original.product.recentLowPrice}</div>
      );
    },
  }),
  columnHelper.display({
    id: 'belowAverageCount',
    header: '평균이하 판매수',
    cell: ({ row }) => {
      return (
        <div>{row.original.product.belowAverageCount}</div>
      );
    },
  }),
];
