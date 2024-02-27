import { Order } from './../../../api/type';

export type SaleSort =
  | 'rank'
  | 'recentHighSalePrice'
  | 'recentLowPrice'
  | 'isConfirmed';

export type SaleSortItem = [SaleSort, Order];

export type RequestSaleList = {
  keyword: string;
  sort: SaleSortItem[];
  length: number;
};
