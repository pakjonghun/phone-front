import UploadFileButton from '@/components/button/UploadButton';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useUploadPurchaseExcel } from '@/hooks/search/purchase/usePurchaseData';
import { useUploadSaleExcel } from '@/hooks/search/sale/useSaleData';
import { SxProps } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  sx?: SxProps;
}

const UploadExcel: FC<Props> = ({ sx = {} }) => {
  const snackbar = useSnackbar();
  const { mutate: upload, isLoading } =
    useUploadPurchaseExcel();

  const inputRef = React.useRef<null | HTMLInputElement>(
    null
  );

  const onChangeInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);

    upload(formBody, {
      onSuccess: () => {
        snackbar(
          '매입 엑셀파일 업로드가 완료되었습니다.',
          'success'
        );
      },
      onError: (error) => {
        const errorMessage = error.response.data.message;
        snackbar(
          errorMessage ??
            '매입 엑셀파일 업로드가 완료되었습니다.',
          'error'
        );
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
      isPending={isLoading}
    />
  );
};

export default UploadExcel;
