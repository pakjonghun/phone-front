import { client } from '@/api/client';

import { DASHBOARD_DATA } from './constant';
import { Dashboard } from '@/model/dashboard';
import { useQuery } from '@tanstack/react-query';

const dashboardData = async () => {
  return client.get('/dashboard').then((res) => {
    return res.data;
  });
};

export const useDashboardData = () => {
  return useQuery<Dashboard, void>({
    queryKey: [DASHBOARD_DATA],
    queryFn: dashboardData,
  });
};
