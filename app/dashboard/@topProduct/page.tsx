'use client';

import React from 'react';
import TopCard from '../_component/TopCard';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import { getWithCommaNumber } from '@/util/util';

const TopProduct = () => {
  const { data } = useDashboardData();

  return (
    <TopCard
      title="제품"
      note="누적 판매수 높은 제품"
      data={data?.topThreeProduct ?? []}
      suffixFunc={({ _id, count }) =>
        `${_id}(${getWithCommaNumber(count)}건)`
      }
    />
  );
};

export default TopProduct;
