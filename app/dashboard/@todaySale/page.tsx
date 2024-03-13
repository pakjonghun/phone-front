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
      title="오늘 총 매출"
      note=""
      data={data?.todaySale ? [data.todaySale] : []}
      suffixFunc={({ accPrice, accMargin, marginRate }) =>
        `매출 : ${getCurrencyToKRW(
          accPrice
        )}, 마진 : ${getCurrencyToKRW(
          accMargin
        )}, 마진율 : ${getTwoRoundedNumber(marginRate)}%`
      }
    />
  );
};

export default TotalSale;
