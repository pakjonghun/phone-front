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
