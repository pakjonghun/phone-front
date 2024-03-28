import { Client } from '@/model/client';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Client;
  label: string;
  numeric: boolean;
  sort?: boolean;
  width?: number;
}

export const headCells: readonly HeadCell[] = [
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: '거래처',
    width: 200,
  },
  {
    id: 'manager',
    numeric: false,
    disablePadding: false,
    label: '담당자',
    width: 140,
  },

  {
    id: 'note',
    numeric: false,
    disablePadding: false,
    label: '비고',
    width: 300,
  },
  {
    id: 'products',
    numeric: false,
    disablePadding: false,
    label: 'TOP10 제품',
    width: 400,
  },
];
