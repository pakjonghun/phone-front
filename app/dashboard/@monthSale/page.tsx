'use client';

import PercentIcon from '@mui/icons-material/Percent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useGetMonthSale } from '@/hooks/dashboard/useDashboard';
import CardSkeleton from '../_component/CardSkeleton';
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import {
  getCurrencyToKRW,
  getTwoRoundedNumber,
} from '@/util/util';

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
            월 누적 매출
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
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
          >
            <MonetizationOnIcon />
            <Stack>
              <Typography
                variant="caption"
                sx={{ color: 'gray' }}
              >
                총매출
              </Typography>
              <Typography>
                {data
                  ? getCurrencyToKRW(data.accOutPrice)
                  : 0}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
          >
            <MonetizationOnIcon />
            <Stack>
              <Typography
                variant="caption"
                sx={{ color: 'gray' }}
              >
                수익
              </Typography>
              <Typography>
                {data
                  ? getCurrencyToKRW(data.accMargin)
                  : 0}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            gap={2}
            alignItems="center"
          >
            <PercentIcon />
            <Stack>
              <Typography
                variant="caption"
                sx={{ color: 'gray' }}
              >
                수익율
              </Typography>
              <Typography>
                {data
                  ? getTwoRoundedNumber(
                      data.accMarginRate
                    ) + '%'
                  : 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ClientSale;
