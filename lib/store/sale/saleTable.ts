import { Sale } from '@/model/sale';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SaleTable = {
  selectedSaleList: Sale[];
  setSelectedSaleList: (saleList: Sale[]) => void;
  handleSelectAllClick: (flatSaleData: Sale[]) => void;
  hasSelectedItem: () => boolean;
  isMultiConfirmLoading: boolean;
  setIsMultiConfirmLoading: (value: boolean) => void;
};

const saleTableApi: StateCreator<
  SaleTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  isMultiConfirmLoading: false,
  setIsMultiConfirmLoading: (value) =>
    set((state) => {
      state.isMultiConfirmLoading = value;
    }),
  selectedSaleList: [],
  hasSelectedItem: () => get().selectedSaleList.length > 0,
  setSelectedSaleList: (saleList) =>
    set(
      (state) => {
        state.selectedSaleList = saleList;
      },
      false,
      'setSelectedSale'
    ),
  handleSelectAllClick: (flatSaleData: Sale[]) =>
    set((state) => {
      if (!flatSaleData) return;

      if (
        get().selectedSaleList.length ===
        flatSaleData.length
      ) {
        state.selectedSaleList = [];
      } else {
        state.selectedSaleList = flatSaleData;
      }
    }),
});

export const useSaleTable = create<
  SaleTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(saleTableApi)));
