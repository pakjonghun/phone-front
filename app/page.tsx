'use client';

import { useMyInfo } from '@/hooks/auth/useAuthData';
import { redirect } from 'next/navigation';

const Home = () => {
  const { data: userInfo, isLoading, isError } = useMyInfo();

  if ((!userInfo && !isLoading) || isError) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }
};

export default Home;
