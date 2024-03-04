'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { ReactNode } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';

export default function MuiDateProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ko"
    >
      {children}
    </LocalizationProvider>
  );
}
