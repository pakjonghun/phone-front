'use client';

import { useGetVisitClientInfinity } from '@/hooks/dashboard/useDashboard';
import TableSkeleton from '../_component/TableSkeleton';
import ClientVisitTable from '../_component/ClientVisit';
import useInfinity from '@/hooks/common/useInfinity';

const MonthProduct = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetVisitClientInfinity();

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    }
  };

  const infinityRef = useInfinity({ callback });
  const flatData = data?.pages.flatMap((item) => item.data);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <ClientVisitTable
      isLoading={isLoading}
      infinityRef={infinityRef}
      data={flatData}
      title="월 거래가 저조한 판매처"
    />
  );
};

export default MonthProduct;
