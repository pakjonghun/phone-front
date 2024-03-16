import {
  CommonError,
  CommonMutation,
  ListData,
} from '@/api/type';
import { client } from '@/api/client';
import { SALE_LIST } from './constant';
import { RequestSaleList } from './type';
import { Sale } from '@/model/sale';
import dayjs from 'dayjs';
import {
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

const uploadSaleExcel = (excelFile: FormData) => {
  return client
    .post('/sale/upload', excelFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};

export const useUploadSaleExcel = () => {
  return useMutation<void, CommonError, FormData>({
    mutationFn: uploadSaleExcel,
  });
};

const saleList = async (
  query: RequestSaleList & { page: number }
) => {
  return client('/sale', { params: query }).then<
    ListData<Sale>
  >((res) => res.data);
};

export const useSaleList = (query: RequestSaleList) => {
  return useInfiniteQuery<ListData<Sale>, AxiosError>({
    queryKey: [SALE_LIST, { ...query }],
    queryFn: ({ pageParam = 1 }) =>
      saleList({ ...query, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};

const downloadSale = async (saleIdList: string[]) => {
  client('/sale/download', {
    params: { idList: saleIdList },
    responseType: 'blob',
  }).then((res) => {
    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );
    const link = document.createElement('a');
    link.href = url;
    const fileName =
      dayjs().format('YYYYMMDDHHmmss') + '판매.xlsx';
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  });
};

export const useDownloadSale = () => {
  return useMutation<void, CommonError, string[]>({
    mutationFn: downloadSale,
  });
};
