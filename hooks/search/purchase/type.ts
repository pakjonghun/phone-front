import { Order } from './../../../api/type';

export type PurchaseSort =
  | 'product'
  | 'distanceLog'
  | 'isConfirmed'
  | 'rank'
  | 'recentHighPurchasePrice'
  | 'recentLowPurchasePrice'
  | 'belowAveragePurchaseCount';

export type PurchaseSortItem = [
  PurchaseSort,
  Order | undefined
];

export type RequestPurchaseList = {
  keyword: string;
  sort: PurchaseSortItem[];
  length: number;
};
