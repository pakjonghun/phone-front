import React, { RefObject, useRef, useState } from 'react';
import {
  Box,
  Button,
  Popper,
  TextField,
  styled,
} from '@mui/material';
import dayjs from 'dayjs';
import { CalendarMonth } from '@mui/icons-material';
import { DateField, DatePicker } from '@mui/x-date-pickers';
import { useMarginQueryStore } from '@/lib/store/sale/marginList';

interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

interface DefinedRange {
  label: string;
  startDate: Date;
  endDate: Date;
}

const DateSelection = () => {
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

  return (
    <Box sx={{ display: 'flex', gap: 1, mr: 1 }}>
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
  );
};

export default DateSelection;
