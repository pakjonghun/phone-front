import { Order } from './../../../api/type';

export type SaleSort =
  | 'product'
  | 'belowAverageCount'
  | 'distanceLog'
  | 'isConfirmed'
  | 'rank'
  | 'recentHighSalePrice'
  | 'recentLowPrice';

export type SaleSortItem = [SaleSort, Order | undefined];

export type RequestSaleList = {
  keyword: string;
  sort: SaleSortItem[];
  length: number;
};
