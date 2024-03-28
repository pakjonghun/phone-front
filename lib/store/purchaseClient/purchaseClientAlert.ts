import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface PurchaseClientAlert {
  warnShow: boolean;
  setWarnShow: (open: boolean) => void;
}

const purchaseClientAlertApi: StateCreator<
  PurchaseClientAlert,
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

export const usePurchaseClientAlert = create<
  PurchaseClientAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(purchaseClientAlertApi)));
