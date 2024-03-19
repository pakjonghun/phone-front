import { Box, Stack } from '@mui/material';
import SearchKeyword from './SearchKeyword';
import { DatePicker } from '@mui/x-date-pickers';
import { useSaleQueryStore } from '@/lib/store/sale/saleList';
import dayjs from 'dayjs';

const SearchFilter = () => {
  const startDate = useSaleQueryStore((state) => state.startDate);
  const setStartDate = useSaleQueryStore((state) => state.setStartDate);
  const endDate = useSaleQueryStore((state) => state.endDate);
  const setEndDate = useSaleQueryStore((state) => state.setEndDate);

  const getDisableStart = (date: Date) => {
    if (endDate) {
      return dayjs(endDate).isBefore(date);
    }

    return false;
  };

  const getDisableEnd = (date: Date) => {
    if (startDate) {
      return dayjs(startDate).isAfter(date);
    }

    return false;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: 'fleXStart',
        gap: {
          xs: 2,
        },
        py: 3,
        borderRadius: '10px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
        <SearchKeyword />
        <Stack direction="row" gap={2} alignItems="center">
          <DatePicker
            shouldDisableDate={getDisableStart}
            value={startDate as unknown as Date}
            onChange={(d) => {
              if (d) {
                const s = dayjs(d).startOf('date');
                setStartDate(s);
              }
            }}
            format="YY년 MM월 DD일"
            label="시작날짜"
          />
          ~
          <DatePicker
            shouldDisableDate={getDisableEnd}
            value={endDate as unknown as Date}
            onChange={(d) => {
              if (d) {
                const e = dayjs(d).endOf('date');
                setEndDate(e);
              }
            }}
            format="YY년 MM월 DD일"
            label="종료날짜"
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchFilter;
