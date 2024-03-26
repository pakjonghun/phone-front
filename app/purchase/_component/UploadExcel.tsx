import UploadFileButton from '@/components/button/UploadButton';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { PURCHASE_LIST } from '@/hooks/search/purchase/constant';
import { useUploadPurchaseExcel } from '@/hooks/search/purchase/usePurchase';
import { SALE_LIST } from '@/hooks/search/sale/constant';
import { SxProps } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react';

interface Props {
  sx?: SxProps;
}

const UploadExcel: FC<Props> = ({ sx = {} }) => {
  const snackbar = useSnackbar();
  const { mutate: upload, isPending, isError } = useUploadPurchaseExcel();

  const inputRef = React.useRef<null | HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const onChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);

    upload(formBody, {
      onSuccess: () => {
        snackbar('매입 엑셀파일 업로드가 완료되었습니다.', 'success');
        queryClient.invalidateQueries({
          queryKey: [PURCHASE_LIST],
        });
      },

      onError: (error) => {
        const errorMessage = error.response.data.message;
        snackbar(errorMessage ?? '매입 엑셀파일 업로드가 실패 하였습니다.', 'error');
      },
      onSettled: () => {
        if (!inputRef.current) return;
        inputRef.current.value = '';
      },
    });
  };

  return (
    <UploadFileButton
      sx={{
        ml: 'auto',
        minWidth: '130px',
        height: '100%',
        ...sx,
      }}
      onChange={onChangeInputFile}
      inputRef={inputRef}
      text="엑셀 업로드"
      isPending={!isError && isPending}
    />
  );
};

export default UploadExcel;
