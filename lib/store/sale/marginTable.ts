import { RequestMarginList } from '@/hooks/search/sale/type';
import { Margin } from '@/model/margin';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type MarginTable = {
  selectedMarginList: Margin[];
  setSelectedMarginList: (marginList: Margin[]) => void;
  handleSelectAllClick: (flatMarginData: Margin[]) => void;
  hasSelectedItem: () => boolean;
  isMultiConfirmLoading: boolean;
  setIsMultiConfirmLoading: (value: boolean) => void;
};

const marginTableApi: StateCreator<
  MarginTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  isMultiConfirmLoading: false,

  setIsMultiConfirmLoading: (value) =>
    set((state) => {
      state.isMultiConfirmLoading = value;
    }),
  selectedMarginList: [],
  hasSelectedItem: () =>
    get().selectedMarginList.length > 0,
  setSelectedMarginList: (marginList) =>
    set(
      (state) => {
        state.selectedMarginList = marginList;
      },
      false,
      'setSelectedMargin'
    ),
  handleSelectAllClick: (flatMarginData: Margin[]) =>
    set((state) => {
      if (!flatMarginData) return;

      if (
        get().selectedMarginList.length ===
        flatMarginData.length
      ) {
        state.selectedMarginList = [];
      } else {
        state.selectedMarginList = flatMarginData;
      }
    }),
});

export const useMarginTable = create<
  MarginTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(marginTableApi)));
