import { CommonError } from '@/api/type';
import { client } from '@/api/client';
import { useMutation, useQuery } from 'react-query';
import { SALE_LIST } from './constant';

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

const saleList = (query: any) => {
  return client('/sale', {
    params: {
      sort: [
        ['rank', 1],
        ['inDate', -1],
      ],
      page: 1,
      length: 10,
      keyword: '',
    },
  });
};

export const useSaleList = () => {
  return useQuery({
    queryKey: SALE_LIST,
    queryFn: saleList,
  });
};
