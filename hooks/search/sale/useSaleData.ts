import { CommonError, ListData } from '@/api/type';
import { client } from '@/api/client';
import { useMutation } from 'react-query';
import { SALE_LIST } from './constant';
import { useInfiniteQuery } from 'react-query';
import { RequestSaleList } from './type';
import { Sale } from '@/model/sale';
import { LENGTH } from '@/api/constant';

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
    queryKey: [SALE_LIST, JSON.stringify(query)],
    queryFn: ({ pageParam = 1 }) =>
      saleList({ ...query, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : null;
    },
  });
};
