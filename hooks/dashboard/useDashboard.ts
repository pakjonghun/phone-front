import { SignupRequest } from './../user/type';
import { client } from '@/api/client';

import { DASHBOARD_DATA } from './constant';
import { Dashboard } from '@/model/dashboard';
import {
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { CommonMutation } from '@/api/type';
import { AxiosError } from 'axios';
import { RequestEditDashboard } from './type';

const dashboardData = async () => {
  return client.get('/dashboard').then((res) => {
    return res.data;
  });
};

export const useDashboardData = () => {
  return useSuspenseQuery<Dashboard, void>({
    queryKey: [DASHBOARD_DATA],
    queryFn: dashboardData,
  });
};

const editDashboardNote = async ({
  note,
  id,
}: RequestEditDashboard) => {
  return client
    .put(`/dashboard/note/${id}`, { note })
    .then((res) => res.data);
};

export const useEditDashboardNote = () => {
  return useMutation<
    CommonMutation,
    AxiosError,
    RequestEditDashboard
  >({ mutationFn: editDashboardNote });
};
