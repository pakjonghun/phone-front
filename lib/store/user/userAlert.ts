import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserAlert {
  warnShow: boolean;
  formShow: boolean;
  setWarnShow: (open: boolean) => void;
  setFormShow: (open: boolean) => void;
}

const userAlertApi: StateCreator<
  UserAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  formShow: false,
  warnShow: false,
  setFormShow: (open) =>
    set(
      (state) => {
        state.formShow = open;
      },
      false,
      'setFormShow'
    ),
  setWarnShow: (open) =>
    set(
      (state) => {
        state.warnShow = open;
      },
      false,
      'setWarnShow'
    ),
});

export const useUserAlert = create<
  UserAlert,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(userAlertApi)));
