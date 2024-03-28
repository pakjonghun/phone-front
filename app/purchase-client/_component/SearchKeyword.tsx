import { usePurchaseQueryStore } from '@/lib/store/purchase/purchaseList';
import { TextField } from '@mui/material';

const SearchKeyword = () => {
  const keyword = usePurchaseQueryStore((state) => state.keyword);
  const setKeyword = usePurchaseQueryStore((state) => state.setKeyword);

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
