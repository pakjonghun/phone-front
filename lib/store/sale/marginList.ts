import { LENGTH } from '@/api/constant';
import {
  MarginSort,
  MarginSortItem,
  RequestMarginList,
} from '@/hooks/search/sale/type';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type MarginQueryAction = {
  getSort: (headerId: string) => MarginSortItem | undefined;
  setKeyword: (keyword: string) => void;
  setSort: (sortItem: MarginSortItem) => void;
  resetSort: (sortKey: MarginSort) => void;
  toggleSortType: () => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
};

type SortType = 'single' | 'multi';

type MarginQueryState = {
  sortType: SortType;
  endDate: null | Date;
  startDate: null | Date;
};

export const initMarginQuery: Omit<
  RequestMarginList,
  'endDate' | 'startDate'
> &
  MarginQueryState = {
  sortType: 'single',
  keyword: '',
  length: LENGTH,
  sort: [],
  endDate: null,
  startDate: null,
};

type MarginQueryStoreType = Omit<
  RequestMarginList,
  'endDate' | 'startDate'
> &
  MarginQueryState &
  MarginQueryAction;

const marginQueryStoreApi: StateCreator<
  MarginQueryStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  ...initMarginQuery,
  setStartDate: (date) =>
    set((state) => {
      state.startDate = date;
    }),
  setEndDate: (date) =>
    set((state) => {
      state.endDate = date;
    }),
  getSort: (headerId) => {
    const targetHeader = get().sort.find(
      ([sortKey]) => sortKey == headerId
    );
    return targetHeader;
  },
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

export const useMarginQueryStore =
  create<MarginQueryStoreType>()(
    immer(devtools(marginQueryStoreApi))
  );
