import { useSaleList } from '@/hooks/search/sale/useSaleData';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { TextField } from '@mui/material';
import React from 'react';

const SearchKeyword = () => {
  const keyword = useSaleQueryStore(
    (state) => state.keyword
  );
  const setKeyword = useSaleQueryStore(
    (state) => state.setKeyword
  );

  // const length = useSaleQueryStore((state) => state.length);
  // const sort = useSaleQueryStore((state) => state.sort);

  // useSaleList({
  //   length,
  //   sort,
  //   keyword,
  // });

  // console.log(data)

  return (
    <TextField
      sx={{ maxWidth: '600px', width: '100%' }}
      label="검색할 제품이름"
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
    />
  );
};

export default SearchKeyword;
