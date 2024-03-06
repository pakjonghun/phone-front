import { client } from '@/api/client';
import { useQuery } from 'react-query';
import { DASHBOARD_DATA } from './constant';
import { Dashboard } from '@/model/dashboard';

const dashboardData = async () => {
  return client.get('/dashboard').then((res) => {
    return res.data;
  });
};

export const useDashboardData = () => {
  return useQuery<Dashboard, void>({
    queryKey: [DASHBOARD_DATA],
    queryFn: dashboardData,
    suspense: true,
  });
};
