import { SaleSort } from '@/hooks/search/sale/type';

interface HeadCell {
  disablePadding: boolean;
  id: SaleSort;
  label: string;
  numeric: boolean;
  sort?: boolean;
  width?: number;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'product',
    numeric: false,
    disablePadding: false,
    label: '펫네임',
    sort: true,
    width: 200,
  },
  {
    id: 'rank',
    numeric: false,
    disablePadding: false,
    label: '등급',
  },
  {
    id: 'distanceLog',
    numeric: true,
    disablePadding: false,
    label: '차감내역',
  },
  {
    id: 'recentHighSalePrice',
    numeric: true,
    disablePadding: false,
    label: '최근 고가 판매가',
  },
  {
    id: 'recentLowPrice',
    numeric: true,
    disablePadding: false,
    label: '최근 저가 판매가',
  },
  {
    id: 'belowAverageCount',
    numeric: true,
    disablePadding: false,
    label: '평균 이하 판매수',
  },
  {
    id: 'isConfirmed',
    numeric: false,
    disablePadding: true,
    label: '관리자 승인',
  },
];

export const saleRank = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'D-',
];
