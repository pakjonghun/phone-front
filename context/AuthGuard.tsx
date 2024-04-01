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
  const { isError, data, isLoading } = useMyInfo();

  const setUser = useAuthStore((state) => state.setUser);
  const path = usePathname();
  const isPublic = publicPath.includes(path);
  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      setUser({ id: null, role: null });
    }

    if (!isError && data) {
      setUser({ id: data.id, role: data.role });
    }
  }, [isPublic, isError, data, isLoading, setUser]);

  if (!isLoading && isError && !isPublic) {
    redirect('/login');
  }

  return children;
};

export default AuthGuard;
