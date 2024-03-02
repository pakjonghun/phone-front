import { PurchaseSort } from './type';

export const PURCHASE_LIST = 'PURCHASE_LIST';

export const canSortList: PurchaseSort[] = [
  'product',
  'distanceLog',
  'isConfirmed',
  'rank',
  'recentHighPurchasePrice',
  'recentLowPurchasePrice',
  'belowAveragePurchaseCount',
];

export const sortEngToHangle: Record<PurchaseSort, string> =
  {
    product: '상품',
    belowAveragePurchaseCount: '평균이하 구매가',
    distanceLog: '차감내역',
    isConfirmed: '승인',
    rank: '등급',
    recentHighPurchasePrice: '최고가',
    recentLowPurchasePrice: '최저가',
  };
