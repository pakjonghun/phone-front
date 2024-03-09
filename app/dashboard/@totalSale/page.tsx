'use client';

import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import React from 'react';
import TopCard from '../_component/TopCard';
import {
  getCurrencyToKRW,
  getTwoRoundedNumber,
} from '@/util/util';

const TotalSale = () => {
  const { data } = useDashboardData();

  return (
    <TopCard
      title="총 매출"
      note=""
      data={data?.totalSale ? [data.totalSale] : []}
      suffixFunc={({ accPrice, accMargin, marginRate }) =>
        `누적매출 : ${getCurrencyToKRW(
          accPrice
        )}, 누적 마진 : ${getCurrencyToKRW(
          accMargin
        )}, 마진율 : ${
          getTwoRoundedNumber(marginRate) * 100
        }%`
      }
    />
  );
};

export default TotalSale;
