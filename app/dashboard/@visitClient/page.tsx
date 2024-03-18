'use client';

import { useGetVisitClient } from '@/hooks/dashboard/useDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import ClientVisitTable from '../_component/ClientVisit';

const MonthProduct = () => {
  const { data, isLoading } = useGetVisitClient();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <ClientVisitTable
      data={data}
      title="월 거래가 저조한 판매처"
    />
  );
};

export default MonthProduct;
