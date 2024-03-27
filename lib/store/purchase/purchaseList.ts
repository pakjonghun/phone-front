import { LENGTH } from '@/api/constant';
import { RequestPurchaseList, PurchaseSort, PurchaseSortItem } from '@/hooks/search/purchase/type';
import { Dayjs } from 'dayjs';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PurchaseQueryAction = {
  getSort: (headerId: string) => PurchaseSortItem | undefined;
  setQuery: (query: RequestPurchaseList) => void;
  setKeyword: (keyword: string) => void;
  setSort: (sortItem: PurchaseSortItem) => void;
  resetSort: (sortKey: PurchaseSort) => void;
  toggleSortType: () => void;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
};

type SortType = 'single' | 'multi';

type PurchaseQueryState = {
  sortType: SortType;
};

export const initPurchaseQuery: RequestPurchaseList & PurchaseQueryState = {
  sortType: 'single',
  keyword: '',
  length: LENGTH,
  sort: [],
  startDate: null,
  endDate: null,
};

type PurchaseQueryStoreType = RequestPurchaseList & PurchaseQueryState & PurchaseQueryAction;

const purchaseQueryStoreApi: StateCreator<
  PurchaseQueryStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  ...initPurchaseQuery,
  getSort: (headerId) => {
    const targetHeader = get().sort.find(([sortKey]) => sortKey == headerId);
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
  setQuery: (query: RequestPurchaseList) => set(query, false, 'setQuery'),
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
          const existSortIndex = state.sort.findIndex(([sortKey]) => sortKey === inputSortKey);
          if (existSortIndex !== -1) {
            state.sort[existSortIndex] = [inputSortKey, inputOrder];
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
          state.sort = state.sort.filter(([sortKey]) => sortKey !== inputSortKey);
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
        state.sortType = state.sortType == 'single' ? 'multi' : 'single';
        state.sort = [];
      },
      false,
      'toggleSort'
    ),
});

export const usePurchaseQueryStore = create<PurchaseQueryStoreType>()(
  immer(devtools(purchaseQueryStoreApi))
);
