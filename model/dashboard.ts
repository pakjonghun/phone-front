import { Client } from './client';

export type Aggregate = {
  _id: string;
  count: number;
  accPrice: number;
  accMargin: number;
  marginRate: number;
};

export type TopTenItem = {
  name: string;
  count: number;
  accPrice: number;
  accMargin: number;
  marginRate: number;
};

export type Dashboard = {
  topTenProduct: TopTenItem[];
  topTenClient: TopTenItem[];
  totalSale: Aggregate;
  todaySale: Aggregate;
  notVisitedOutClient: Client[];
  notVisitedInClient: Client[];
};
