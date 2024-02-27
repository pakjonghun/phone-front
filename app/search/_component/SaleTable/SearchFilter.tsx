import { LENGTH } from '@/api/constant';
import UploadFileButton from '@/components/button/UploadButton';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { RequestSaleList } from '@/hooks/search/sale/type';
import { useUploadSaleExcel } from '@/hooks/search/sale/useSaleData';
import { Box, ListItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState<RequestSaleList>({
    keyword: '',
    length: LENGTH,
    page: 1,
    sort: [],
  });

  const snackbar = useSnackbar();
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const { mutate: upload, isLoading } = useUploadSaleExcel();

  const onChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formBody = new FormData();
    formBody.append('file', file);

    upload(formBody, {
      onSuccess: () => {
        snackbar('판매 엑셀파일 업로드가 완료되었습니다.');
      },
      onError: (error) => {
        const errorMessage = error.response.data.message;
        snackbar(
          errorMessage ?? '판매 엑셀파일 업로드가 완료되었습니다.',
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
    <>
      <Box sx={{ display: 'flex', my: 3 }}>
        <TextField label="검색 키워드" />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          // label="Age"
          // onChange={handleChange}
        >
          <ListItem>모델번호</ListItem>
          <ListItem>등급</ListItem>
          <ListItem>차감내역</ListItem>
        </Select>

        <UploadFileButton
          sx={{
            ml: 'auto',
          }}
          onChange={onChangeInputFile}
          inputRef={inputRef}
          text="판매 엑셀 업로드"
          isPending={isLoading}
        />
      </Box>
    </>
  );
};

export default SearchFilter;
