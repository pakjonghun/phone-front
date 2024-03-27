'use client';

import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';
import { useGetMonthProduct } from '@/hooks/purchaseDashboard/usePurchaseDashboard';

const MonthProduct = () => {
  const { data, isLoading } = useGetMonthProduct();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <TopTenTable data={data} title="월 TOP10 상품" />;
};

export default MonthProduct;
