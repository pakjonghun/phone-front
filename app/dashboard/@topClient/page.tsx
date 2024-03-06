'use client';

import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import React from 'react';
import TopCard from '../_component/TopCard';
import { getWithCommaNumber } from '@/util/util';

const TopClient = () => {
  const { data } = useDashboardData();
  return (
    <TopCard
      title="거래처"
      note="누적 판매수 높은 거래처"
      data={data?.topThreeClient ?? []}
      suffixFunc={({ _id, count }) =>
        `${_id}(${getWithCommaNumber(count)}건)`
      }
    />
  );
};

export default TopClient;
