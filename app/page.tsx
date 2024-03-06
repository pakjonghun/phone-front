import { serverMe } from '@/api/user';
import { redirect } from 'next/navigation';

const Home = async () => {
  const userInfo = await serverMe();

  if (!userInfo) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }
};

export default Home;
