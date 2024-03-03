import { Purchase } from './purchase';
import { Sale } from './sale';

export type Aggregate = {
  _id: string;
  count: number;
  accPrice: number;
};

export type RecentSale = Omit<
  Sale,
  'product' | 'outClient'
> & {
  product: string;
  outClient: string;
};

export type RecentPurchase = Omit<
  Purchase,
  'product' | 'inClient'
> & {
  product: string;
  inClient: string;
};

export type Dashboard = {
  topThreeProduct: Aggregate[];
  topThreeClient: Aggregate[];
  totalSale: Aggregate;
  recentTenSale: RecentSale[];
  recentTenPurchase: RecentPurchase[];
  topTenClientSale: Aggregate[];
  topTenClientPurchase: Aggregate[];
};
