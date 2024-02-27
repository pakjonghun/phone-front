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
import React from 'react';
import { menuList } from './constant';

const MenuList = () => {
  return (
    <List>
      {menuList.map(({ name, id, icon }) => (
        <ListItem key={id} disablePadding>
          <ListItemButton sx={{ p: 0 }}>
            <CustomLink href={id}>
              <ListItemIcon>{!!icon && icon}</ListItemIcon>
              <ListItemText primary={name} />
            </CustomLink>
          </ListItemButton>
        </ListItem>
      ))}
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
