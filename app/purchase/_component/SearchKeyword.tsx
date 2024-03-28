import { useDebounce } from '@/hooks/common/useDebounce';
import { usePurchaseList } from '@/hooks/search/purchase/usePurchase';
import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';
import { usePurchaseTable } from '@/lib/store/purchase/purchaseTable';
import { TextField } from '@mui/material';
import { useEffect } from 'react';

const SearchKeyword = () => {
  const keyword = usePurchaseQueryStore((state) => state.keyword);
  const setKeyword = usePurchaseQueryStore((state) => state.setKeyword);
  const setSelectedIdList = usePurchaseTable((state) => state.setSelectedPurchaseList);

  useEffect(() => {
    setSelectedIdList([]);
  }, [keyword]);

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
