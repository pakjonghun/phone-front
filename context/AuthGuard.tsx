'use client';

import { useMyInfo } from '@/hooks/auth/useAuthData';
import { useAuthStore } from '@/lib/store/auth/auth';
import { redirect, usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const publicPath = ['/login/'];

const AuthGuard: FC<Props> = ({ children }) => {
  const { isError } = useMyInfo();

  const setUser = useAuthStore((state) => state.setUser);
  const path = usePathname();
  const isPublic = publicPath.includes(path);
  useEffect(() => {
    if (isError && !isPublic) {
      setUser({ id: null, role: null });
    }
  }, [isPublic, isError, setUser]);

  if (isError && !isPublic) {
    redirect('/login');
  }

  return children;
};

export default AuthGuard;
