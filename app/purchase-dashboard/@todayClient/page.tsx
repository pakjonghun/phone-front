'use client';

import { useGetTodayClient } from '@/hooks/purchaseDashboard/usePurchaseDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';

const MonthProduct = () => {
  const { data, isLoading } = useGetTodayClient();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="오늘 TOP10 매입처" />;
};

export default MonthProduct;
