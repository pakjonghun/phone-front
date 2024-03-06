'use client';

import React from 'react';
import TopTenClient from '../_component/TopTenClient';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';

const ProductPurchase = () => {
  const { data } = useDashboardData();
  return (
    <TopTenClient
      data={data?.topTenClientSale ?? []}
      title="거래처 판매순위"
    />
  );
};

export default ProductPurchase;
