import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserId {
  selectedUserId: string;
  setSelectedUserId: (userId: string) => void;
}

const userIdApi: StateCreator<
  UserId,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  selectedUserId: 'false',
  setSelectedUserId: (userId) =>
    set(
      (state) => {
        state.selectedUserId = userId;
      },
      false,
      'setUserId'
    ),
});

export const useUserId = create<
  UserId,
  [['zustand/immer', never], ['zustand/devtools', never]]
>(immer(devtools(userIdApi)));
