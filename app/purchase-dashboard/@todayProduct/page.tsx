'use client';

import { useGetTodayProduct } from '@/hooks/purchaseDashboard/usePurchaseDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';

const MonthProduct = () => {
  const { data, isLoading } = useGetTodayProduct();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="오늘 TOP10 상품" />;
};

export default MonthProduct;
