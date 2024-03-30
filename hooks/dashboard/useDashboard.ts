import { client } from '@/api/client';
import {
  DASHBOARD_DATA,
  MONTH_CLIENT,
  MONTH_PRODUCT,
  MONTH_SALE,
  TODAY_CLIENT,
  TODAY_PRODUCT,
  TODAY_SALE,
  VISIT_CLIENT,
} from './constant';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { CommonMutation, ListData } from '@/api/type';
import { AxiosError } from 'axios';
import { RequestEditDashboard, RequestPageParam } from './type';
import { TopRecord, TotalSale } from '@/model/dashboard';
import { Client } from '@/model/client';
import { LENGTH } from '@/api/constant';

const getVisitClient = async (params: RequestPageParam) => {
  return client.get('/dashboard/visit-client', { params }).then((res) => {
    return res.data;
  });
};

export const useGetVisitClientInfinity = () => {
  return useInfiniteQuery<
    ListData<(Client & { accOutPrice: number; accMargin: number; marginRate: number })[]>,
    RequestPageParam
  >({
    getNextPageParam: (lastPage, allPage) => (lastPage.hasNext ? allPage.length + 1 : null),
    initialPageParam: 1,
    queryKey: [VISIT_CLIENT, DASHBOARD_DATA],
    queryFn: ({ pageParam = 1 }) => {
      return getVisitClient({ page: pageParam as number, length: LENGTH });
    },
  });
};

const getMonthClient = async () => {
  return client.get('/dashboard/month-client').then((res) => {
    return res.data;
  });
};

export const useGetMonthClient = () => {
  return useQuery<TopRecord[], void>({
    queryKey: [MONTH_CLIENT, DASHBOARD_DATA],
    queryFn: getMonthClient,
  });
};

const getTodayClient = async () => {
  return client.get('/dashboard/today-client').then((res) => {
    return res.data;
  });
};

export const useGetTodayClient = () => {
  return useQuery<TopRecord[], void>({
    queryKey: [TODAY_CLIENT, DASHBOARD_DATA],
    queryFn: getTodayClient,
  });
};

const getMonthProduct = async () => {
  return client.get('/dashboard/month-product').then((res) => {
    return res.data;
  });
};

export const useGetMonthProduct = () => {
  return useQuery<TopRecord[], void>({
    queryKey: [MONTH_PRODUCT, DASHBOARD_DATA],
    queryFn: getMonthProduct,
  });
};

const getTodayProduct = async () => {
  return client.get('/dashboard/today-product').then((res) => {
    return res.data;
  });
};

export const useGetTodayProduct = () => {
  return useQuery<TopRecord[], void>({
    queryKey: [TODAY_PRODUCT, DASHBOARD_DATA],
    queryFn: getTodayProduct,
  });
};

const getMonthSale = async () => {
  return client.get('/dashboard/month-sale').then((res) => {
    return res.data;
  });
};

export const useGetMonthSale = () => {
  return useQuery<TotalSale, void>({
    queryKey: [MONTH_SALE, DASHBOARD_DATA],
    queryFn: getMonthSale,
  });
};

const getTodaySale = async () => {
  return client.get('/dashboard/today-sale').then((res) => {
    return res.data;
  });
};

export const useGetTodaySale = () => {
  return useQuery<TotalSale, void>({
    queryKey: [TODAY_SALE, DASHBOARD_DATA],
    queryFn: getTodaySale,
  });
};

const editDashboardNote = async ({ note, id }: RequestEditDashboard) => {
  return client.put(`/dashboard/note/${id}`, { note }).then((res) => res.data);
};

export const useEditDashboardNote = () => {
  return useMutation<CommonMutation, AxiosError, RequestEditDashboard>({
    mutationFn: editDashboardNote,
  });
};
