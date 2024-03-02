import { SaleSort } from './type';

export const SALE_LIST = 'SALE_LIST';

export const canSortList: SaleSort[] = [
  'product',
  'belowAverageCount',
  'distanceLog',
  'isConfirmed',
  'rank',
  'recentHighSalePrice',
  'recentLowPrice',
];

export const sortEngToHangle: Record<SaleSort, string> = {
  product: '상품',
  belowAverageCount: '평균이하 판매가',
  distanceLog: '차감내역',
  isConfirmed: '승인',
  rank: '등급',
  recentHighSalePrice: '최고가',
  recentLowPrice: '최저가',
};
