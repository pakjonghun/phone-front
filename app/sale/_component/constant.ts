import { SaleSort } from '@/hooks/search/sale/type';

export interface HeadCell {
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

export type Rank =
  | 'A+'
  | 'A-'
  | 'A'
  | 'B+'
  | 'B-'
  | 'B'
  | 'C+'
  | 'C-'
  | 'C'
  | 'D'
  | 'D+'
  | 'D-';

export const rankReverse: Record<number, Rank> = {
  [0]: 'A+',
  [1]: 'A',
  [2]: 'A-',
  [3]: 'B+',
  [4]: 'B',
  [5]: 'B-',
  [6]: 'C+',
  [7]: 'C',
  [8]: 'C-',
  [9]: 'D+',
  [10]: 'D',
  [11]: 'D-',
};
