import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ResponseMyInfo } from '@/hooks/type';

interface AuthStore {
  user: ResponseMyInfo | null;
  setUser: (user: ResponseMyInfo | null) => void;
}

const initState = {
  user: null,
};

const authApi: StateCreator<AuthStore, [['zustand/devtools', never]]> = (
  set
) => ({
  ...initState,
  setUser: (user: ResponseMyInfo | null) =>
    set(() => ({ user }), false, 'user'),
});

export const useAuthStore = create<AuthStore>()(
  persist(devtools(authApi), { name: 'PHONE_USER_INFO' })
);
