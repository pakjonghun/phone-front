import { Sale } from '@/model/sale';
import { Order } from './../../../api/type';

type SaleSort = Pick<
  Sale,
  'rank' | 'recentHighSalePrice' | 'recentLowPrice' | 'isConfirmed'
>;

type SaleSortList = Partial<Record<keyof SaleSort, Order>>[];

export type RequestSaleList = {
  keyword: string;
  sort: SaleSortList;
  page: number;
  length: number;
};
