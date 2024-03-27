import { Purchase } from '@/model/purchase';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Purchase;
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
    width: 140,
  },
  {
    id: 'inClient',
    numeric: false,
    disablePadding: false,
    label: '매입처',
    sort: true,
    width: 140,
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
    id: 'imei',
    numeric: false,
    disablePadding: false,
    label: 'IMEI',
    width: 150,
  },

  {
    id: 'inPrice',
    numeric: true,
    disablePadding: false,
    label: '실매입가',
    sort: true,
  },

  {
    id: 'note',
    numeric: false,
    disablePadding: true,
    label: '특이사항',
    width: 200,
  },
];
