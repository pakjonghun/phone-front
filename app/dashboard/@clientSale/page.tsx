'use client';

import React from 'react';
import RecentPurchaseTable from '../_component/RecentPurchaseTable';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';

const ClientSale = () => {
  const { data } = useDashboardData();
  return (
    <RecentPurchaseTable
      data={data?.recentTenPurchase ?? []}
      title="최근 매입"
    />
  );
};

export default ClientSale;
