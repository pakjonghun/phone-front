import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import { useSaleTable } from '@/lib/store/sale/saleTable';
import { TextField } from '@mui/material';
import { useEffect } from 'react';

const SearchKeyword = () => {
  const keyword = useSaleQueryStore((state) => state.keyword);
  const setKeyword = useSaleQueryStore((state) => state.setKeyword);

  const setSelectedIdList = useSaleTable((state) => state.setSelectedSaleList);

  useEffect(() => {
    setSelectedIdList([]);
  }, [keyword, setSelectedIdList]);

  return (
    <TextField
      sx={{
        maxWidth: {
          xs: '100%',
          md: '600px',
        },
        width: '100%',
      }}
      label="검색할 제품이름"
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
    />
  );
};

export default SearchKeyword;
