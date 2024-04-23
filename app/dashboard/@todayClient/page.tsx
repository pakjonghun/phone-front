'use client';

import { useGetTodayClient } from '@/hooks/dashboard/useDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';
import { useDashboardStore } from '@/lib/store/dashboard/dashboardDate';

const MonthProduct = () => {
  const date = useDashboardStore((state) => state.saleDate);
  const { data, isLoading } = useGetTodayClient(date);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="오늘 TOP10 판매처" />;
};

export default MonthProduct;
