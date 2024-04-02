'use client';

import { useDashboardStore } from '@/lib/store/dashboard/dashboardDate';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';
import { useGetMonthClient } from '@/hooks/purchaseDashboard/usePurchaseDashboard';

const MonthProduct = () => {
  const date = useDashboardStore((state) => state.purchaseDate);
  const { data, isLoading } = useGetMonthClient(date);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="월 TOP10 매입처" />;
};

export default MonthProduct;
