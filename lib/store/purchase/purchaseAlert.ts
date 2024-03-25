import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface PurchaseAlert {
  warnShow: boolean;
  setWarnShow: (open: boolean) => void;
}

const purchaseAlertApi: StateCreator<
  PurchaseAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  warnShow: false,
  setWarnShow: (open) =>
    set(
      (state) => {
        state.warnShow = open;
      },
      false,
      'setWarnShow'
    ),
});

export const usePurchaseAlert = create<
  PurchaseAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(purchaseAlertApi)));
