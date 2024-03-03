import { Purchase } from '@/model/purchase';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PurchaseTable = {
  selectedPurchaseList: Purchase[];
  setSelectedPurchaseList: (
    purchaseList: Purchase[]
  ) => void;
  handleSelectAllClick: (
    flatPurchaseData: Purchase[]
  ) => void;
  hasSelectedItem: () => boolean;
  isMultiConfirmingLoading: boolean;
  setIsMultiConfirmingLoading: (value: boolean) => void;
};

const purchaseTableApi: StateCreator<
  PurchaseTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set, get) => ({
  isMultiConfirmingLoading: false,
  setIsMultiConfirmingLoading: (value) =>
    set((state) => {
      state.isMultiConfirmingLoading = value;
    }),
  selectedPurchaseList: [],
  hasSelectedItem: () =>
    get().selectedPurchaseList.length > 0,
  setSelectedPurchaseList: (purchaseList) =>
    set(
      (state) => {
        state.selectedPurchaseList = purchaseList;
      },
      false,
      'setSelectedPurchase'
    ),
  handleSelectAllClick: (flatPurchaseData: Purchase[]) =>
    set((state) => {
      if (!flatPurchaseData) return;

      if (
        get().selectedPurchaseList.length ===
        flatPurchaseData.length
      ) {
        state.selectedPurchaseList = [];
      } else {
        state.selectedPurchaseList = flatPurchaseData;
      }
    }),
});

export const usePurchaseTable = create<
  PurchaseTable,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(purchaseTableApi)));
