import { useClientQueryStore } from '@/lib/store/client/clientList';
import { TextField } from '@mui/material';

const SearchKeyword = () => {
  const keyword = useClientQueryStore((state) => state.keyword);
  const setKeyword = useClientQueryStore((state) => state.setKeyword);

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
