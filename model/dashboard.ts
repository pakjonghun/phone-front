import { Client } from './client';

export type TopRecord = TotalSale & {
  name: string;
};

export type TotalSale = {
  accPrice: number;
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
