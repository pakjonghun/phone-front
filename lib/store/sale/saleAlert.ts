import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SaleAlert {
  warnShow: boolean;
  setWarnShow: (open: boolean) => void;
}

const saleAlertApi: StateCreator<
  SaleAlert,
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

export const useSaleAlert = create<
  SaleAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(saleAlertApi)));
