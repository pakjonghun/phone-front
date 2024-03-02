import { PurchaseSort } from '@/hooks/search/purchase/type';

export interface HeadCell {
  disablePadding: boolean;
  id: PurchaseSort;
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
    id: 'recentHighPurchasePrice',
    numeric: true,
    disablePadding: false,
    label: '최근 고가 매입가',
  },
  {
    id: 'recentLowPurchasePrice',
    numeric: true,
    disablePadding: false,
    label: '최근 저가 매입가',
  },
  {
    id: 'belowAveragePurchaseCount',
    numeric: true,
    disablePadding: false,
    label: '평균 이하 매입수',
  },
  {
    id: 'isConfirmed',
    numeric: false,
    disablePadding: true,
    label: '관리자 승인',
  },
];

export const purchaseRank = [
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
