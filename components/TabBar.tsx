'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    ['/dashboard' as string]: 0,
    ['/purchase-dashboard']: 1,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={pathMapper[pathname]} aria-label="nav tabs example" role="navigation">
        <LinkTab label="판매" href="/dashboard" />
        <LinkTab label="매입" href="/purchase-dashboard" />
      </Tabs>
    </Box>
  );
}
