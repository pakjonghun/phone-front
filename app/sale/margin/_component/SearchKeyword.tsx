import { useDebounce } from '@/hooks/common/useDebounce';
import { useMarginList } from '@/hooks/search/sale/useSaleData';
import { Box, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useMarginQueryStore } from '@/lib/store/sale/marginList';
import { useMarginTable } from '@/lib/store/sale/marginTable';
import dayjs from 'dayjs';

const SearchKeyword = () => {
  const keyword = useMarginQueryStore(
    (state) => state.keyword
  );
  const setKeyword = useMarginQueryStore(
    (state) => state.setKeyword
  );

  const setSelectedIdList = useMarginTable(
    (state) => state.setSelectedMarginList
  );

  useEffect(() => {
    setSelectedIdList([]);
  }, [keyword]);

  const delayText = useDebounce({ text: keyword });
  const length = useMarginQueryStore(
    (state) => state.length
  );
  const sort = useMarginQueryStore((state) => state.sort);
  const setStartDate = useMarginQueryStore(
    (state) => state.setStartDate
  );
  const startDate = useMarginQueryStore(
    (state) => state.startDate
  );
  const setEndDate = useMarginQueryStore(
    (state) => state.setEndDate
  );
  const endDate = useMarginQueryStore(
    (state) => state.endDate
  );
  useMarginList({
    length,
    sort,
    keyword: delayText,
    startDate: startDate
      ? dayjs(startDate).format('YYYYMMDDHHmmss')
      : undefined,
    endDate: endDate
      ? dayjs(endDate).format('YYYYMMDDHHmmss')
      : undefined,
  });

  return (
    <Stack direction="row" alignItems="center">
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
      <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
        <DatePicker
          format="YYYY년 MM월 DD일"
          label="검색 시작일"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          format="YYYY년 MM월 DD일"
          label="검색 종료일"
          value={endDate}
          onChange={setEndDate}
        />
      </Box>
    </Stack>
  );
};

export default SearchKeyword;
