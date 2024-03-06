'use client';

import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import React from 'react';
import TopCard from '../_component/TopCard';
import {
  getCurrencyToKRW,
  getWithCommaNumber,
} from '@/util/util';

const TotalSale = () => {
  const { data } = useDashboardData();

  return (
    <TopCard
      title="총 매출"
      note="누적 판매수/판매금액"
      data={data?.totalSale ? [data.totalSale] : []}
      suffixFunc={({ count, accPrice }) =>
        `누적판매 : ${getWithCommaNumber(
          count
        )}건 / 누적 매출 : ${getCurrencyToKRW(accPrice)}`
      }
    />
  );
};

export default TotalSale;
