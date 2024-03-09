'use client';

import React from 'react';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import ClientVisitTable from '../_component/\bClientVisit';

const ClientSale = () => {
  const { data } = useDashboardData();

  return (
    <ClientVisitTable
      tableType="purchase"
      data={data?.notVisitedInClient ?? []}
      title="구매가 저조한 거래처"
    />
  );
};

export default ClientSale;
