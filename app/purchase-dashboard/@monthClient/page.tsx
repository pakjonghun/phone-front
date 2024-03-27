'use client';

import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';
import { useGetMonthClient } from '@/hooks/purchaseDashboard/usePurchaseDashboard';

const MonthProduct = () => {
  const { data, isLoading } = useGetMonthClient();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="월 TOP10 매입처" />;
};

export default MonthProduct;
