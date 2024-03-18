import { LENGTH } from '@/api/constant';
import {
  RequestSaleList,
  SaleSort,
  SaleSortItem,
} from '@/hooks/search/sale/type';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SaleQueryAction = {
  getSort: (headerId: string) => SaleSortItem | undefined;
  setQuery: (query: RequestSaleList) => void;
  setKeyword: (keyword: string) => void;
  setSort: (sortItem: SaleSortItem) => void;
  resetSort: (sortKey: SaleSort) => void;
  toggleSortType: () => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
};

type SortType = 'single' | 'multi';

type SaleQueryState = {
  sortType: SortType;
};

export const initSaleQuery: RequestSaleList &
  SaleQueryState = {
  sortType: 'single',
  keyword: '',
  length: LENGTH,
  sort: [],
  startDate: null,
  endDate: null,
};

type SaleQueryStoreType = RequestSaleList &
  SaleQueryState &
  SaleQueryAction;

const saleQueryStoreApi: StateCreator<
  SaleQueryStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  ...initSaleQuery,
  getSort: (headerId) => {
    const targetHeader = get().sort.find(
      ([sortKey]) => sortKey == headerId
    );
    return targetHeader;
  },
  setStartDate: (date) =>
    set((state) => {
      state.startDate = date;
    }),
  setEndDate: (date) =>
    set((state) => {
      state.endDate = date;
    }),
  setQuery: (query: RequestSaleList) =>
    set(query, false, 'setQuery'),
  setKeyword: (keyword) =>
    set(
      (state) => {
        state.keyword = keyword;
      },
      false,
      'setKeyword'
    ),
  setSort: ([inputSortKey, inputOrder]) =>
    set(
      (state) => {
        const isMulti = get().sortType === 'multi';

        if (isMulti) {
          const existSortIndex = state.sort.findIndex(
            ([sortKey]) => sortKey === inputSortKey
          );
          if (existSortIndex !== -1) {
            state.sort[existSortIndex] = [
              inputSortKey,
              inputOrder,
            ];
          } else {
            state.sort.push([inputSortKey, inputOrder]);
          }
        } else {
          state.sort = [[inputSortKey, inputOrder]];
        }
      },
      false,
      'setSort'
    ),
  resetSort: (inputSortKey) =>
    set(
      (state) => {
        const isMulti = get().sortType == 'multi';
        if (isMulti) {
          state.sort = state.sort.filter(
            ([sortKey]) => sortKey !== inputSortKey
          );
        } else {
          state.sort = [];
        }
      },
      false,
      'resetSort'
    ),
  toggleSortType: () =>
    set(
      (state) => {
        state.sortType =
          state.sortType == 'single' ? 'multi' : 'single';
        state.sort = [];
      },
      false,
      'toggleSort'
    ),
});

export const useSaleQueryStore =
  create<SaleQueryStoreType>()(
    immer(devtools(saleQueryStoreApi))
  );
