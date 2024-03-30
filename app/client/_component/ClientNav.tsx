'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider } from '@mui/material';

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
    ['/client/' as string]: 0,
    ['/purchase-client/']: 1,
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Tabs value={pathMapper[pathname]} aria-label="nav tabs example" role="navigation">
        <LinkTab label="판매" href="/client" />
        <LinkTab label="매입" href="/purchase-client" />
      </Tabs>
      <Divider />
    </Box>
  );
}
