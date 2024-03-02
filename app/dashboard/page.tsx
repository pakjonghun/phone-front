'use client';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import RecentSaleTable from './_component/RecentSaleTable';

const Dashboard = () => {
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
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={6} md={4} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">제품</Typography>
              <Typography variant="subtitle1">
                누적 판매수 높은제품
              </Typography>
              <Stack direction="row" gap={2} mt={2}>
                {['겔럭시(20건)', '겔럭시2(30건)'].map(
                  (item, index) => (
                    <Stack
                      key={item}
                      direction="row"
                      alignItems="center"
                      gap={1}
                    >
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                      >
                        {index + 1}
                      </Avatar>
                      <Typography variant="body1">
                        {item}
                      </Typography>
                    </Stack>
                  )
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={4} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                거래처 매입
              </Typography>
              <Typography variant="subtitle1">
                누적 거래량 높은 거래처
              </Typography>
              <Stack direction="row" gap={2} mt={2}>
                {[
                  '삼성겔럭시 매입(20건)',
                  '농심 매입(30건)',
                ].map((item, index) => (
                  <Stack
                    key={item}
                    direction="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {index + 1}
                    </Avatar>
                    <Typography variant="body1">
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={4} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                거래처 판매
              </Typography>
              <Typography variant="subtitle1">
                누적 거래량 높은 거래처
              </Typography>
              <Stack direction="row" gap={2} mt={2}>
                {[
                  '삼성겔럭시 판매(20건)',
                  '농심 판매(30건)',
                ].map((item, index) => (
                  <Stack
                    key={item}
                    direction="row"
                    alignItems="center"
                    gap={1}
                  >
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {index + 1}
                    </Avatar>
                    <Typography variant="body1">
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={12} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                매출 현황
              </Typography>
              <Typography variant="subtitle1">
                총매입(1000) / 총수입(10000) / 총수익(10000)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid mt={6} container spacing={4}>
        <Grid item xs={12} lg={6}>
          <RecentSaleTable />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RecentSaleTable />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RecentSaleTable />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RecentSaleTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
