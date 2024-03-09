'use client';

import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import React from 'react';
import TopTenClient from '../_component/TopTenTable';

const TopClient = () => {
  const { data } = useDashboardData();
  return (
    <TopTenClient
      title="최근한달 우수 판매처"
      data={data?.topTenClient ?? []}
    />
  );
};

export default TopClient;
