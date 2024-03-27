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

  const startDate = usePurchaseQueryStore((state) => state.startDate);
  const endDate = usePurchaseQueryStore((state) => state.endDate);
  useEffect(() => {
    setSelectedIdList([]);
  }, [keyword]);

  const delayText = useDebounce({ text: keyword });
  const length = usePurchaseQueryStore((state) => state.length);
  const sort = usePurchaseQueryStore((state) => state.sort);

  usePurchaseList({
    length,
    sort,
    keyword: delayText,
    startDate,
    endDate,
  });

  return (
    <TextField
      sx={{
        maxWidth: {
          xs: '100%',
          md: '600px',
        },
        width: '100%',
      }}
      label="검색할 거래처 이름"
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
    />
  );
};

export default SearchKeyword;
