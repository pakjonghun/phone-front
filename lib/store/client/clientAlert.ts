import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ClientAlert {
  warnShow: boolean;
  setWarnShow: (open: boolean) => void;
}

const clientAlertApi: StateCreator<
  ClientAlert,
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

export const useClientAlert = create<
  ClientAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(clientAlertApi)));
