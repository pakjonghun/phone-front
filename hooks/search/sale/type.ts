import { Sale } from '@/model/sale';
import { Order } from './../../../api/type';

export type SaleSort = keyof Omit<Sale, '_id'>;

export type SaleSortItem = [SaleSort, Order | undefined];

export type RequestSaleList = {
  keyword: string;
  sort: SaleSortItem[];
  length: number;
  startDate: Date | null;
  endDate: Date | null;
};

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
};
