import { Sale } from '@/model/sale';
import { createColumnHelper } from '@tanstack/react-table';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const columnHelper = createColumnHelper<Sale>();

export const SaleColumns = [
  columnHelper.display({
    id: 'collapseButton',
    header: '',
    cell: ({ row }) => {
      return <KeyboardArrowUpIcon />;
    },
  }),
  columnHelper.display({
    id: 'isConfirmed',
    header: '관리자 승인',
    cell: ({ row }) => {
      return <div>{row.original.isConfirmed ? 'true' : 'false'}</div>;
    },
  }),
  columnHelper.display({
    id: 'modelNumber',
    header: '모델번호',
    cell: ({ row }) => {
      return <div>{row.original.modelNumber}</div>;
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
      return <div>{row.original.distanceLog ?? 'none'}</div>;
    },
  }),
  columnHelper.display({
    id: 'recentHighSalePrice',
    header: '최근 고가 판매가',
    cell: ({ row }) => {
      return <div>{row.original.recentHighSalePrice}</div>;
    },
  }),
  columnHelper.display({
    id: 'recentRowPrice',
    header: '최근 저가 판매가',
    cell: ({ row }) => {
      return <div>{row.original.recentLowPrice}</div>;
    },
  }),
  columnHelper.display({
    id: 'belowAverageCount',
    header: '평균이하 판매수',
    cell: ({ row }) => {
      return <div>{row.original.belowAverageCount}</div>;
    },
  }),
];
