'use client';

import React from 'react';
import RecentSaleTable from '../_component/RecentSaleTable';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';

const ClientPurchase = () => {
  const { data } = useDashboardData();

  return (
    <RecentSaleTable
      data={data?.recentTenSale ?? []}
      title="최근 판매"
    />
  );
};

export default ClientPurchase;
