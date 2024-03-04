import UploadFileButton from '@/components/button/UploadButton';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { SALE_LIST } from '@/hooks/search/sale/constant';
import { useUploadSaleExcel } from '@/hooks/search/sale/useSaleData';
import { SxProps } from '@mui/material';
import React, { FC } from 'react';
import { useQueryClient } from 'react-query';

interface Props {
  sx?: SxProps;
}

const UploadExcel: FC<Props> = ({ sx = {} }) => {
  const snackbar = useSnackbar();
  const {
    mutate: upload,
    isLoading,
    isError,
  } = useUploadSaleExcel();

  const inputRef = React.useRef<null | HTMLInputElement>(
    null
  );

  const queryClient = useQueryClient();

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
          '판매 엑셀파일 업로드가 완료되었습니다.',
          'success'
        );
        queryClient.invalidateQueries([SALE_LIST]);
      },

      onError: (error) => {
        const errorMessage = error.response.data.message;
        snackbar(
          errorMessage ??
            '판매 엑셀파일 업로드가 실패 하였습니다.',
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
      isPending={!isError && isLoading}
    />
  );
};

export default UploadExcel;
