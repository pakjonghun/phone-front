'use client';

import {
  Box,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import RecentSaleTable from './_component/RecentSaleTable';
import { useDashboardData } from '@/hooks/dashboard/useDashboard';
import TopCard from './_component/TopCard';
import CardSkeleton from './_component/CardSkeleton';
import RecentPurchaseTable from './_component/RecentPurchaseTable';
import TopTenClient from './_component/TopTenClient';
import {
  getCurrencyToKRW,
  getWithCommaNumber,
} from './util';

const Dashboard = () => {
  const { data, isLoading } = useDashboardData();

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Typography sx={{ mb: 4 }} variant="h4">
        대시보드
      </Typography>
      <Grid
        sx={{
          alignItems: 'stretch',
        }}
        container
        rowSpacing={3}
        columnSpacing={2}
      >
        <Grid item xs={12} sm={6} lg={4}>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <TopCard
              title="총 매출"
              note="누적 판매수/판매금액"
              data={data?.totalSale ? [data.totalSale] : []}
              suffixFunc={({ count, accPrice }) =>
                `누적판매 : ${getWithCommaNumber(
                  count
                )}건 / 누적 매출 : ${getCurrencyToKRW(
                  accPrice
                )}`
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <TopCard
              title="거래처"
              note="누적 판매수 높은 거래처"
              data={data?.topThreeClient ?? []}
              suffixFunc={({ _id, count }) =>
                `${_id}(${getWithCommaNumber(count)}건)`
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <TopCard
              title="제품"
              note="누적 판매수 높은 제품"
              data={data?.topThreeProduct ?? []}
              suffixFunc={({ _id, count }) =>
                `${_id}(${getWithCommaNumber(count)}건)`
              }
            />
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height="685px"
            />
          ) : (
            <RecentSaleTable
              data={data?.recentTenSale ?? []}
              title="최근 판매"
            />
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height="685px"
            />
          ) : (
            <RecentPurchaseTable
              data={data?.recentTenPurchase ?? []}
              title="최근 매입"
            />
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height="685px"
            />
          ) : (
            <TopTenClient
              data={data?.topTenClientSale ?? []}
              title="거래처 판매순위"
            />
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              width="100%"
              height="685px"
            />
          ) : (
            <TopTenClient
              data={data?.topTenClientPurchase ?? []}
              title="거래처 매입순위"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
