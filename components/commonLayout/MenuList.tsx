import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { menuList } from './constant';
import { useAuthStore } from '@/lib/store/auth/auth';
import { Role } from '@/model/user';
import { usePathname } from 'next/navigation';

const MenuList = () => {
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === Role.ADMIN;
  const pathname = usePathname();
  let firstURL = pathname.match(/^\/([^/]+)/)?.[1] ?? '';
  if (firstURL.includes('-')) firstURL = firstURL.split('-')[1];
  return (
    <List>
      {menuList.map(({ name, id, icon }) => {
        const adminItem = id === 'admin';
        if (adminItem && !isAdmin) return <Fragment key={id} />;
        return (
          <ListItem key={`${name}_${id}`} disablePadding>
            <ListItemButton selected={id === firstURL} sx={{ p: 0 }}>
              <CustomLink href={`/${id}`}>
                <ListItemIcon>{!!icon && icon}</ListItemIcon>
                <ListItemText primary={name} />
              </CustomLink>
            </ListItemButton>
          </ListItem>
        );
      })}
      <Divider />
    </List>
  );
};

export default MenuList;

const CustomLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  height: '100%',
});
