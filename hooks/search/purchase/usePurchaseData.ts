import { CommonError } from '@/api/type';
import { client } from '@/api/client';
import { useMutation } from 'react-query';

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
