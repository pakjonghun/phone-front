import { Order } from '../../../api/type';

export type MarginSort =
  | 'product'
  | 'isConfirmed'
  | 'inPrice'
  | 'outPrice'
  | 'margin'
  | 'marginRate'
  | 'outClient';

export type MarginSortItem = [
  MarginSort,
  Order | undefined
];

export type RequestMarginList = {
  keyword: string;
  sort: MarginSortItem[];
  length: number;
  startDate?: string;
  endDate?: string;
};
