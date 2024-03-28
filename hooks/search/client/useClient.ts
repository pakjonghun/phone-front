import { CommonMutation, ListData } from '@/api/type';
import { client } from '@/api/client';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RequestClientList, RequestEditClient } from './type';
import { Client } from '@/model/client';
import { CLIENT_LIST } from './constant';

const clientList = async (query: RequestClientList & { page: number }) => {
  return client('/sale-client', { params: query }).then<ListData<Client>>((res) => res.data);
};

export const useClientList = (query: RequestClientList) => {
  return useInfiniteQuery<ListData<Client>, AxiosError>({
    queryKey: [CLIENT_LIST, { ...query }],
    queryFn: ({ pageParam = 1 }) => clientList({ ...query, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};

const editClient = async (body: RequestEditClient) => {
  return client.put('/sale-client', body).then((res) => res.data);
};

export const useEditClient = () => {
  return useMutation<CommonMutation, AxiosError, RequestEditClient>({
    mutationFn: editClient,
  });
};

const purchaseClientList = async (query: RequestClientList & { page: number }) => {
  return client('/purchase/client', { params: query }).then<ListData<Client>>((res) => res.data);
};

export const usePurchaseClientList = (query: RequestClientList) => {
  return useInfiniteQuery<ListData<Client>, AxiosError>({
    queryKey: [CLIENT_LIST, { ...query }],
    queryFn: ({ pageParam = 1 }) => purchaseClientList({ ...query, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};

const editPurchaseClient = async (body: RequestEditClient) => {
  console.log(body);
  return client.put('/purchase/client', body).then((res) => res.data);
};

export const useEditPurchaseClient = () => {
  return useMutation<CommonMutation, AxiosError, RequestEditClient>({
    mutationFn: editPurchaseClient,
  });
};
