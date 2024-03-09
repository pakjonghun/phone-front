'use client';

import React from 'react';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import ClientVisitTable from '../_component/\bClientVisit';

const ClientSale = () => {
  const { data } = useDashboardData();

  return (
    <ClientVisitTable
      tableType="sale"
      data={data?.notVisitedOutClient ?? []}
      title="판매가 저조한 거래처"
    />
  );
};

export default ClientSale;
