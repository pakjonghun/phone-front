'use client';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CardSkeleton from '../_component/CardSkeleton';
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { getCurrencyToKRW } from '@/util/util';
import { useGetMonthSale } from '@/hooks/purchaseDashboard/usePurchaseDashboard';

const ClientSale = () => {
  const { data, isLoading } = useGetMonthSale();
  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <Card sx={{ p: 1, height: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h5">
            월 누적 매입
          </Typography>
        }
      />

      <CardContent>
        <Stack
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
          }}
          gap={2}
          justifyContent="space-around"
        >
          <Stack direction="row" gap={2} alignItems="center">
            <MonetizationOnIcon />
            <Stack>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                총매입
              </Typography>
              <Typography>{data ? getCurrencyToKRW(data.accInPrice) : 0}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <MonetizationOnIcon />
            <Stack>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                총수량
              </Typography>
              <Typography>{data ? data.count : 0}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ClientSale;
