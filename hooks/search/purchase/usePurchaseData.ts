import { CommonMutation, ListData } from '@/api/type';
import { useInfiniteQuery } from 'react-query';
import { RequestPurchaseList } from './type';
import dayjs from 'dayjs';
import { CommonError } from '@/api/type';
import { client } from '@/api/client';
import { useMutation } from 'react-query';
import {
  PURCHASE_CONFIRM,
  PURCHASE_LIST,
} from './constant';
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

const purchaseList = async (
  query: RequestPurchaseList & { page: number }
) => {
  return client('/purchase', { params: query }).then<
    ListData<Purchase>
  >((res) => res.data);
};

export const usePurchaseList = (
  query: RequestPurchaseList
) => {
  return useInfiniteQuery<
    ListData<Purchase>,
    RequestPurchaseList
  >({
    queryKey: [PURCHASE_LIST, { ...query }],
    queryFn: ({ pageParam = 1 }) =>
      purchaseList({ ...query, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};

const confirmPurchase = async (
  purchaseIdList: string[]
) => {
  return client
    .put('/purchase', { idList: purchaseIdList })
    .then((res) => res.data);
};

export const useConfirmPurchase = () => {
  return useMutation<CommonMutation, CommonError, string[]>(
    {
      mutationKey: [PURCHASE_CONFIRM],
      mutationFn: confirmPurchase,
    }
  );
};

const applyPurchase = () => {
  return client('/purchase/apply').then((res) => res.data);
};

export const useApplyPurchase = () => {
  return useMutation<CommonMutation, CommonError, void>(
    applyPurchase
  );
};

const downloadPurchase = async (
  purchaseIdList: string[]
) => {
  client('/purchase/download', {
    params: { idList: purchaseIdList },
    responseType: 'blob',
  }).then((res) => {
    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );
    const link = document.createElement('a');
    link.href = url;
    const fileName =
      dayjs().format('YYYYMMDDHHmmss') + '매입.xlsx';
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
