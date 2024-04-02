'use client';

import { useGetMonthClient } from '@/hooks/dashboard/useDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';
import { useDashboardStore } from '@/lib/store/dashboard/dashboardDate';

const MonthProduct = () => {
  const date = useDashboardStore((state) => state.saleDate);
  const { data, isLoading } = useGetMonthClient(date);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="월 TOP10 판매처" />;
};

export default MonthProduct;
