'use client';

import { useMyInfo } from '@/hooks/auth/useAuthData';
import { CircularProgress } from '@mui/material';
import { redirect, usePathname } from 'next/navigation';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const publicPath = ['/login/'];

const AuthGuard: FC<Props> = ({ children }) => {
  const { data: userInfo, isError, isLoading } = useMyInfo();
  const path = usePathname();

  if (isLoading) {
    return <CircularProgress />;
  }

  const hasUserData = !!userInfo && !isError;

  if (publicPath.includes(path)) {
    return hasUserData ? ( //
      redirect('/dashboard')
    ) : (
      <>{children}</>
    );
  } else {
    return hasUserData ? ( //
      <>{children}</>
    ) : (
      redirect('/login')
    );
  }
};

export default AuthGuard;
