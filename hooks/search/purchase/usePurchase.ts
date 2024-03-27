import { CommonError, CommonMutation, ListData } from '@/api/type';
import { client } from '@/api/client';
import { PURCHASE_LIST } from './constant';
import { RequestPurchaseList } from './type';
import dayjs from 'dayjs';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Purchase } from '@/model/purchase';

const uploadPurchaseExcel = (excelFile: FormData) => {
  return client
    .post('/purchase/upload', excelFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};

export const useUploadPurchaseExcel = () => {
  return useMutation<void, CommonError, FormData>({
    mutationFn: uploadPurchaseExcel,
  });
};

const purchaseList = async (query: RequestPurchaseList & { page: number }) => {
  return client('/purchase', { params: query }).then<ListData<Purchase>>((res) => res.data);
};

export const usePurchaseList = (query: RequestPurchaseList) => {
  return useInfiniteQuery<ListData<Purchase>, AxiosError>({
    queryKey: [PURCHASE_LIST, { ...query }],
    queryFn: ({ pageParam = 1 }) => purchaseList({ ...query, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};

const downloadPurchase = async (purchaseIdList: string[]) => {
  client('/purchase/download', {
    params: { idList: purchaseIdList },
    responseType: 'blob',
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    const fileName = dayjs().format('YYYYMMDDHHmmss') + '판매.xlsx';
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  });
};

export const useDownloadPurchase = () => {
  return useMutation<void, CommonError, string[]>({
    mutationFn: downloadPurchase,
  });
};
