'use client';

import { Box, Grid, Typography } from '@mui/material';

import { FC, ReactNode } from 'react';
import CommonLayout from '@/components/commonLayout/CommonLayout';

interface Props {
  children: ReactNode;
  clientPurchase: ReactNode;
  clientSale: ReactNode;
  productSale: ReactNode;
  productPurchase: ReactNode;
  totalSale: ReactNode;
  topClient: ReactNode;
  topProduct: ReactNode;
}

const Dashboard: FC<Props> = ({
  clientPurchase,
  clientSale,
  productPurchase,
  productSale,
  totalSale,
  topClient,
  topProduct,
}) => {
  return (
    <CommonLayout>
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
            {totalSale}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {topClient}
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            {topProduct}
          </Grid>
          <Grid item xs={12} lg={6}>
            {clientPurchase}
          </Grid>
          <Grid item xs={12} lg={6}>
            {clientSale}
          </Grid>
          <Grid item xs={12} lg={6}>
            {productPurchase}
          </Grid>
          <Grid item xs={12} lg={6}>
            {productSale}
          </Grid>
        </Grid>
      </Box>
    </CommonLayout>
  );
};

export default Dashboard;
