'use client';

import React from 'react';
import TopTenClient from '../_component/TopTenClient';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';

const ProductSale = () => {
  const { data } = useDashboardData();

  return (
    <TopTenClient
      data={data?.topTenClientPurchase ?? []}
      title="거래처 매입순위"
    />
  );
};

export default ProductSale;
