import { Client } from '@/model/client';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PurchaseClientTable = {
  selectedPurchaseClientList: Client[];
  setSelectedPurchaseClientList: (purchaseClientList: Client[]) => void;
  handleSelectAllClick: (flatPurchaseClientData: Client[]) => void;
  hasSelectedItem: () => boolean;
  isMultiConfirmLoading: boolean;
  setIsMultiConfirmLoading: (value: boolean) => void;
};

const purchaseClientTableApi: StateCreator<
  PurchaseClientTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  isMultiConfirmLoading: false,
  setIsMultiConfirmLoading: (value) =>
    set((state) => {
      state.isMultiConfirmLoading = value;
    }),
  selectedPurchaseClientList: [],
  hasSelectedItem: () => get().selectedPurchaseClientList.length > 0,
  setSelectedPurchaseClientList: (purchaseClientList) =>
    set(
      (state) => {
        state.selectedPurchaseClientList = purchaseClientList;
      },
      false,
      'setSelectedPurchaseClient'
    ),
  handleSelectAllClick: (flatPurchaseClientData: Client[]) =>
    set((state) => {
      if (!flatPurchaseClientData) return;

      if (get().selectedPurchaseClientList.length === flatPurchaseClientData.length) {
        state.selectedPurchaseClientList = [];
      } else {
        state.selectedPurchaseClientList = flatPurchaseClientData;
      }
    }),
});

export const usePurchaseClientTable = create<
  PurchaseClientTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(purchaseClientTableApi)));
