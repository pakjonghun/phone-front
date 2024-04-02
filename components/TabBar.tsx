'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider } from '@mui/material';
import { useDashboardStore } from '@/lib/store/dashboard/dashboardDate';
import { DatePicker } from '@mui/x-date-pickers';

interface LinkTabProps {
  href: string;
  label?: string;
}

function LinkTab(props: LinkTabProps) {
  return <Tab component={Link} {...props} />;
}

export default function NavTabs() {
  const pathname = usePathname();
  const pathMapper = {
    ['/dashboard/' as string]: 0,
    ['/purchase-dashboard/']: 1,
  };

  const saleDate = useDashboardStore((state) => state.saleDate);
  const purchaseDate = useDashboardStore((state) => state.purchaseDate);
  const setPurchaseDate = useDashboardStore((state) => state.setPurchase);
  const setSaleDate = useDashboardStore((state) => state.setSale);

  const isSalePath = pathname === '/dashboard/' || pathname === '/dashboard';

  const date = isSalePath ? saleDate : purchaseDate;
  const setDate = isSalePath ? setSaleDate : setPurchaseDate;

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'space-between',
        }}
      >
        <Tabs value={pathMapper[pathname]} aria-label="nav tabs example" role="navigation">
          <LinkTab label="판매" href="/dashboard" />
          <LinkTab label="매입" href="/purchase-dashboard" />
        </Tabs>
        <DatePicker
          sx={{ my: { xs: 3, md: 0 } }}
          value={date}
          onChange={setDate}
          format="YYYY년 MM월"
          label="연도, 월 선택"
          views={['year', 'month']}
        />
      </Box>
      <Divider />
    </Box>
  );
}
