import { serverMe } from '@/api/user';
import CommonLayout from '@/components/commonLayout/CommonLayout';
import Dashboard from '@/components/dashboard/Dashboard';
import { redirect } from 'next/navigation';

const Home = async () => {
  const userInfo = await serverMe();
  console.log(userInfo);

  if (!userInfo) {
    redirect('/login');
  } else {
    return (
      <CommonLayout>
        <Dashboard />
      </CommonLayout>
    );
  }
};

export default Home;
