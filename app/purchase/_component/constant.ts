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
    id: 'outDate',
    numeric: false,
    disablePadding: false,
    label: '판매일',
    sort: true,
    width: 140,
  },
  {
    id: 'outClient',
    numeric: false,
    disablePadding: false,
    label: '판매처',
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
    id: 'outPrice',
    numeric: true,
    disablePadding: false,
    label: '실판매가',
    sort: true,
    width: 140,
  },
  {
    id: 'margin',
    numeric: true,
    disablePadding: false,
    label: '손익',
    sort: true,
    width: 140,
  },
  {
    id: 'marginRate',
    numeric: true,
    disablePadding: false,
    label: '수익율',
    sort: true,
    width: 120,
  },
  {
    id: 'note',
    numeric: false,
    disablePadding: true,
    label: '특이사항',
    width: 200,
  },
];
