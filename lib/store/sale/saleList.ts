import { LENGTH } from '@/api/constant';
import {
  RequestSaleList,
  SaleSortItem,
} from '@/hooks/search/sale/type';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SaleQueryAction = {
  setQuery: (query: RequestSaleList) => void;
  setKeyword: (keyword: string) => void;
  setSort: (sort: SaleSortItem[]) => void;
};

export const initSaleQuery: RequestSaleList = {
  keyword: '',
  length: LENGTH,
  sort: [],
};

type SaleQueryStoreType = RequestSaleList & SaleQueryAction;

const saleQueryStoreApi: StateCreator<
  SaleQueryStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initSaleQuery,
  setQuery: (query: RequestSaleList) =>
    set(query, false, 'setQuery'),
  setKeyword: (keyword) =>
    set((state) => {
      state.keyword = keyword;
    }),
  setSort: (sort) =>
    set((state) => {
      state.sort = sort;
    }),
});

export const useSaleQueryStore =
  create<SaleQueryStoreType>()(
    immer(devtools(saleQueryStoreApi))
  );
