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
import { Dayjs } from 'dayjs';

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

const getMonthClient = async (date: string | null) => {
  return client.get('/dashboard/month-client', { params: { date } }).then((res) => {
    return res.data;
  });
};

export const useGetMonthClient = (date: null | Dayjs) => {
  const saleDate = date != null ? date.format('YYYYMMDDHHmmss') : null;

  return useQuery<TopRecord[], void>({
    queryKey: [MONTH_CLIENT, DASHBOARD_DATA, saleDate],
    queryFn: () => getMonthClient(saleDate),
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

const getMonthProduct = async (date: string | null) => {
  return client.get('/dashboard/month-product', { params: { date } }).then((res) => {
    return res.data;
  });
};

export const useGetMonthProduct = (date: Dayjs | null) => {
  const saleDate = date == null ? null : date.format('YYYYMMDDHHmmss');
  return useQuery<TopRecord[], void>({
    queryKey: [MONTH_PRODUCT, DASHBOARD_DATA, saleDate],
    queryFn: () => getMonthProduct(saleDate),
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

const getMonthSale = async (date: string | null) => {
  return client
    .get('/dashboard/month-sale', {
      params: {
        date,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useGetMonthSale = (date: Dayjs | null) => {
  const saleDate = date != null ? date.format('YYYYMMDDHHmmss') : null;
  return useQuery<TotalSale, void>({
    queryKey: [MONTH_SALE, DASHBOARD_DATA, saleDate],
    queryFn: () => getMonthSale(saleDate),
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
