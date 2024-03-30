'use client';

import { useMyInfo } from '@/hooks/auth/useAuthData';
import { useAuthStore } from '@/lib/store/auth/auth';
import { redirect, usePathname } from 'next/navigation';

const Home = () => {
  redirect('/dashboard');
  // // const { data: userInfo, isLoading, isError } = useMyInfo();
  // const userId = useAuthStore(state=>state.id);
  // const path = usePathname();

  // if(path==='/login/'&&userId){
  //   redirect('/dashboard');
  // }else{
  //   redirect('/login');
  // }
};

export default Home;
