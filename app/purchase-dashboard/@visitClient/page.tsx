'use client';

import { useGetVisitClient } from '@/hooks/purchaseDashboard/usePurchaseDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import ClientVisitTable from '../_component/ClientVisit';

const MonthProduct = () => {
  const { data, isLoading } = useGetVisitClient();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <>{!!data && <ClientVisitTable data={data} title="거래가 저조한 거래처" />}</>;
};

export default MonthProduct;
