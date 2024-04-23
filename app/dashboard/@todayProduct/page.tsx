'use client';

import { useGetTodayProduct } from '@/hooks/dashboard/useDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';
import { useDashboardStore } from '@/lib/store/dashboard/dashboardDate';

const MonthProduct = () => {
  const date = useDashboardStore((state) => state.saleDate);
  const { data, isLoading } = useGetTodayProduct(date);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="오늘 TOP10 상품" />;
};

export default MonthProduct;
