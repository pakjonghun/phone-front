'use client';

import { Box, Grid, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import CommonLayout from '@/components/commonLayout/CommonLayout';
import NavTabs from '@/components/TabBar';
import dayjs from 'dayjs';
import { useGetUploadRecordList, usePurchaseGetUploadRecordList } from '@/hooks/auth/useAuthData';

interface Props {
  visitClient: ReactNode;
  monthProduct: ReactNode;
  todayProduct: ReactNode;
  monthSale: ReactNode;
  todaySale: ReactNode;
  monthClient: ReactNode;
  todayClient: ReactNode;
}

const Dashboard: FC<Props> = ({
  visitClient,
  monthSale,
  todaySale,
  monthProduct,
  todayProduct,
  monthClient,
  todayClient,
}) => {
  const { data } = usePurchaseGetUploadRecordList();
  function getLastDate() {
    if (!data || !Array.isArray(data)) return '';

    const lastLength = data.length;
    const recent = data[lastLength - 1]?.updatedAt;
    const date = recent ? dayjs(recent).format('MM월 DD일 HH시 MM분') : '';
    return date;
  }

  return (
    <CommonLayout>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          pageBreakAfter: 4,
        }}
      >
        <Stack
          component="header"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography sx={{ mb: 4 }} variant="h4">
            대시보드
          </Typography>
          <Typography sx={{ mr: 3, mb: 1 }}>{getLastDate()}</Typography>
        </Stack>
        <NavTabs />
        <Grid
          sx={{
            alignItems: 'stretch',
            pb: 5,
          }}
          container
          rowSpacing={3}
          columnSpacing={2}
        >
          <Grid item xs={12} sm={6}>
            {monthSale}
          </Grid>
          <Grid item xs={12} sm={6}>
            {todaySale}
          </Grid>

          <Grid item xs={12} lg={6}>
            {monthProduct}
          </Grid>

          <Grid item xs={12} lg={6}>
            {todayProduct}
          </Grid>
          <Grid item xs={12} lg={6}>
            {monthClient}
          </Grid>

          <Grid item xs={12} lg={6}>
            {todayClient}
          </Grid>
          <Grid item xs={12}>
            {visitClient}
          </Grid>
          {/* <Grid item xs={6}>
            {totalSale}
          </Grid>
          <Grid item xs={6}>
            {todaySale}
          </Grid>

          <Grid item xs={12} lg={6}>
            {topClient}
          </Grid>
          <Grid item xs={12} lg={6}>
            {topProduct}
          </Grid>
          <Grid item xs={12} lg={6}>
            {clientSale}
          </Grid>
          <Grid item xs={12} lg={6}>
            {clientPurchase}
          </Grid> */}
        </Grid>
      </Box>
    </CommonLayout>
  );
};

export default Dashboard;
