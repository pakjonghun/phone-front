import { Order } from './../../../api/type';
import { Dayjs } from 'dayjs';
import { Purchase } from '@/model/purchase';

export type PurchaseSort = keyof Omit<Purchase, '_id'>;

export type PurchaseSortItem = [PurchaseSort, Order | undefined];

export type RequestPurchaseList = {
  keyword: string;
  sort: PurchaseSortItem[];
  length: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};
