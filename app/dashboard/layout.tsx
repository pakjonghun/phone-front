'use client';

import { Box, Grid, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import CommonLayout from '@/components/commonLayout/CommonLayout';

interface Props {
  todaySale: ReactNode;
  clientPurchase: ReactNode;
  clientSale: ReactNode;
  totalSale: ReactNode;
  topClient: ReactNode;
  topProduct: ReactNode;
}

const Dashboard: FC<Props> = ({
  clientPurchase,
  clientSale,
  totalSale,
  topClient,
  topProduct,
  todaySale,
}) => {
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
        <Typography sx={{ mb: 4 }} variant="h4">
          대시보드
        </Typography>
        <Grid
          sx={{
            alignItems: 'stretch',
            pb: 5,
          }}
          container
          rowSpacing={3}
          columnSpacing={2}
        >
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
      </Box>
    </CommonLayout>
  );
};

export default Dashboard;
