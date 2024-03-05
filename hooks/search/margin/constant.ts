import { MarginSort } from './type';

export const SALE_LIST = 'SALE_LIST';
export const MARGIN_LIST = 'MARGIN_LIST';

export const canSortList: MarginSort[] = [
  'product',
  'inPrice',
  'isConfirmed',
  'margin',
  'marginRate',
  'outPrice',
  'outClient',
];

export const sortEngToHangle: Record<MarginSort, string> = {
  product: '상품',
  inPrice: '매입가',
  isConfirmed: '승인여부',
  margin: '마진',
  marginRate: '마진율',
  outPrice: '판매가',
  outClient: '판매처',
};
