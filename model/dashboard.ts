import { Client } from './client';

export type TopRecord = TotalSale & {
  name: string;
};

export type TotalSale = {
  accOutPrice: number;
  accMargin: number;
  accMarginRate: number;
};

export type Dashboard = {
  monthSale: TotalSale[];
  todaySale: TotalSale[];
  monthTopProduct: any[];
  monthTopClient: any[];
  todayTopProduct: any[];
  todayTopClient: any[];
  notVisitedOutClient: Client[];
};
