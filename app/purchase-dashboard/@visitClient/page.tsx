'use client';

import { useGetVisitClient } from '@/hooks/purchaseDashboard/usePurchaseDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import ClientVisitTable from '../_component/ClientVisit';
import { useDashboardStore } from '@/lib/store/dashboard/dashboardDate';
import { useEffect } from 'react';

const MonthProduct = () => {
  const date = useDashboardStore((state) => state.purchaseDate);
  const { data, isLoading, refetch } = useGetVisitClient(date);

  useEffect(() => {
    refetch();
  }, [date, refetch]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <>{!!data && <ClientVisitTable data={data} title="월 거래가 저조한 거래처" />}</>;
};

export default MonthProduct;
