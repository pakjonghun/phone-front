import { CommonMutation, ListData } from '@/api/type';
import { useInfiniteQuery } from 'react-query';
import { RequestSaleList } from './type';
import { Sale } from '@/model/sale';
import dayjs from 'dayjs';
import { CommonError } from '@/api/type';
import { client } from '@/api/client';
import { useMutation } from 'react-query';
import { PURCHASE_LIST } from './constant';

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
  return useInfiniteQuery<ListData<Sale>, RequestSaleList>({
    queryKey: [PURCHASE_LIST, { ...query }],
    queryFn: ({ pageParam = 1 }) =>
      saleList({ ...query, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};

const confirmSale = async (saleIdList: string[]) => {
  return client
    .put('/sale', { idList: saleIdList })
    .then((res) => res.data);
};

export const useConfirmSale = () => {
  return useMutation<CommonMutation, CommonError, string[]>(
    {
      mutationFn: confirmSale,
    }
  );
};

const applySale = () => {
  return client('/sale/apply').then((res) => res.data);
};

export const useApplySale = () => {
  return useMutation<CommonMutation, CommonError, void>(
    applySale
  );
};

const downloadSale = async (saleIdList: string[]) => {
  client('/sale/download', {
    params: { idList: saleIdList },
    responseType: 'blob',
  }).then((res) => {
    console.log('res : ', res.data);
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
