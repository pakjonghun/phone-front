'use client';

import {
  useGetMonthClient,
  useGetMonthProduct,
} from '@/hooks/dashboard/useDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import TopTenTable from '../_component/TopTenTable';

const MonthProduct = () => {
  const { data, isLoading } = useGetMonthClient();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <TopTenTable data={data} title="월 TOP10 판매처" />
  );
};

export default MonthProduct;
