import { Box, Grid, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import CommonLayout from '@/components/commonLayout/CommonLayout';
import NavTabs from './_component/TabBar';

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
        {/* <NavTabs /> */}
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
