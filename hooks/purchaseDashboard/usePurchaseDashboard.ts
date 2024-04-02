import { Client } from '../../model/client';
import { client } from '../../api/client';
import { CommonMutation } from '../../api/type';
import {
  MONTH_CLIENT_PURCHASE,
  MONTH_PRODUCT_PURCHASE,
  MONTH_PURCHASE,
  TODAY_CLIENT_PURCHASE,
  TODAY_PRODUCT_PURCHASE,
  TODAY_PURCHASE,
  VISIT_CLIENT_PURCHASE,
} from './constant';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RequestEditDashboard, TopPurchase } from './type';
import { Dayjs } from 'dayjs';

const getVisitClient = async () => {
  return client.get('/purchase/dashboard/visit-client').then((res) => {
    return res.data;
  });
};

export const useGetVisitClient = () => {
  return useQuery<(Client & { lastInDate: string; accInPrice: number; count: number })[], void>({
    queryKey: [VISIT_CLIENT_PURCHASE],
    queryFn: getVisitClient,
  });
};

const getMonthClient = async (date: string | null) => {
  return client.get('/purchase/dashboard/month-client', { params: { date } }).then((res) => {
    return res.data;
  });
};

export const useGetMonthClient = (date: Dayjs | null) => {
  const purchaseDate = date == null ? null : date.format('YYYYMMDDHHmmss');
  return useQuery<TopPurchase[], void>({
    queryKey: [MONTH_CLIENT_PURCHASE, purchaseDate],
    queryFn: () => getMonthClient(purchaseDate),
  });
};

const getTodayClient = async () => {
  return client.get('/purchase/dashboard/today-client').then((res) => {
    return res.data;
  });
};

export const useGetTodayClient = () => {
  return useQuery<TopPurchase[], void>({
    queryKey: [TODAY_CLIENT_PURCHASE],
    queryFn: getTodayClient,
  });
};

const getMonthProduct = async (date: string | null) => {
  return client.get('/purchase/dashboard/month-product', { params: { date } }).then((res) => {
    return res.data;
  });
};

export const useGetMonthProduct = (date: Dayjs | null) => {
  const purhcaseDate = date == null ? null : date.format('YYYYMMDDHHmmss');
  return useQuery<TopPurchase[], void>({
    queryKey: [MONTH_PRODUCT_PURCHASE, purhcaseDate],
    queryFn: () => getMonthProduct(purhcaseDate),
  });
};

const getTodayProduct = async () => {
  return client.get('/purchase/dashboard/today-product').then((res) => {
    return res.data;
  });
};

export const useGetTodayProduct = () => {
  return useQuery<TopPurchase[], void>({
    queryKey: [TODAY_PRODUCT_PURCHASE],
    queryFn: getTodayProduct,
  });
};

const getMonthSale = async (date: string | null) => {
  return client
    .get('/purchase/dashboard/month-purchase', {
      params: {
        date,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useGetMonthSale = (date: null | Dayjs) => {
  const purchaseDate = date == null ? null : date.format('YYYYMMDDHHmmss');
  return useQuery<TopPurchase, void>({
    queryKey: [MONTH_PURCHASE, purchaseDate],
    queryFn: () => getMonthSale(purchaseDate),
  });
};

const getTodaySale = async () => {
  return client.get('/purchase/dashboard/today-purchase').then((res) => {
    return res.data;
  });
};

export const useGetTodaySale = () => {
  return useQuery<TopPurchase, void>({
    queryKey: [TODAY_PURCHASE],
    queryFn: getTodaySale,
  });
};

const editDashboardNote = async ({ note, id }: RequestEditDashboard) => {
  return client.put(`/purchase/dashboard/note/${id}`, { note }).then((res) => res.data);
};

export const useEditDashboardNote = () => {
  return useMutation<CommonMutation, AxiosError, RequestEditDashboard>({
    mutationFn: editDashboardNote,
  });
};
