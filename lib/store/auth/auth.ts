import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Role } from '@/model/user';

type AuthUser = {
  id: string | null;
  role: Role | null;
};

interface AuthAction {
  setUser: (user: AuthUser) => void;
}

const initState: AuthUser = {
  id: null,
  role: null,
};

const authApi: StateCreator<
  AuthUser & AuthAction,
  [['zustand/devtools', never]]
> = (set) => ({
  ...initState,
  setUser: (user) => set(() => ({ ...user }), false, 'user'),
});

export const useAuthStore = create<AuthAction & AuthUser>()(devtools(authApi));
