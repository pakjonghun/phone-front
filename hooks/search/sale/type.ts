import { Sale } from '@/model/sale';
import { Order } from './../../../api/type';
import { Dayjs } from 'dayjs';

export type SaleSort = keyof Omit<Sale, '_id'>;

export type SaleSortItem = [SaleSort, Order | undefined];

export type RequestSaleList = {
  keyword: string;
  sort: SaleSortItem[];
  length: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

export type MarginSort =
  | 'product'
  | 'isConfirmed'
  | 'inPrice'
  | 'outPrice'
  | 'margin'
  | 'marginRate'
  | 'outClient';

export type MarginSortItem = [MarginSort, Order | undefined];

export type RequestMarginList = {
  keyword: string;
  sort: MarginSortItem[];
  length: number;
};
