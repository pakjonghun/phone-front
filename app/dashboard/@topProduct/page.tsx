'use client';

import React from 'react';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import TopTenClient from '../_component/TopTenTable';

const TopProduct = () => {
  const { data } = useDashboardData();

  return (
    <TopTenClient
      title="최근한달 베스트 제품"
      data={data?.topTenProduct ?? []}
    />
  );
};

export default TopProduct;
