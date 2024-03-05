import { MarginSort } from '@/hooks/search/sale/type';

export interface HeadCell {
  disablePadding: boolean;
  id: MarginSort;
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
    id: 'outClient',
    numeric: false,
    disablePadding: false,
    label: '판매처',
    sort: true,
  },

  {
    id: 'outPrice',
    numeric: true,
    disablePadding: false,
    label: '판매가',
  },
  {
    id: 'inPrice',
    numeric: false,
    disablePadding: false,
    label: '매입가',
  },
  {
    id: 'margin',
    numeric: true,
    disablePadding: false,
    label: '마진',
  },
  {
    id: 'marginRate',
    numeric: true,
    disablePadding: false,
    label: '마진율',
  },

  {
    id: 'isConfirmed',
    numeric: false,
    disablePadding: true,
    label: '관리자 승인',
  },
];
