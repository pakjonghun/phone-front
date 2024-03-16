import { Sale } from '@/model/sale';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Sale;
  label: string;
  numeric: boolean;
  sort?: boolean;
  width?: number;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'inDate',
    numeric: false,
    disablePadding: false,
    label: '매입일',
    sort: true,
    width: 200,
  },
  {
    id: 'inClient',
    numeric: false,
    disablePadding: false,
    label: '매입처',
    sort: true,
    width: 200,
  },
  {
    id: 'outDate',
    numeric: false,
    disablePadding: false,
    label: '판매일',
    sort: true,
    width: 200,
  },
  {
    id: 'outClient',
    numeric: false,
    disablePadding: false,
    label: '판매처',
    sort: true,
    width: 200,
  },
  {
    id: 'product',
    numeric: false,
    disablePadding: false,
    label: '펫네임',
    sort: true,
    width: 200,
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: '일련번호',
  },
  {
    id: 'imei',
    numeric: false,
    disablePadding: false,
    label: 'IMEI',
  },

  {
    id: 'inPrice',
    numeric: true,
    disablePadding: false,
    label: '실매입가',
    sort: true,
  },
  {
    id: 'outPrice',
    numeric: true,
    disablePadding: false,
    label: '실판매가',
    sort: true,
  },
  {
    id: 'margin',
    numeric: true,
    disablePadding: false,
    label: '손익',
    sort: true,
  },
  {
    id: 'marginRate',
    numeric: true,
    disablePadding: false,
    label: '수익율',
    sort: true,
  },
  {
    id: 'note',
    width: 300,
    numeric: false,
    disablePadding: true,
    label: '특이사항',
  },
  // {
  //   id: 'rank',
  //   numeric: false,
  //   disablePadding: true,
  //   label: '등급',
  // },
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
