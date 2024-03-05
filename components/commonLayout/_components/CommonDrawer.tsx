'use client';

import { useSnackbar } from '@/context/SnackBarProvicer';
import { logout } from '@/hooks/auth/useAuthData';
import { useAuthStore } from '@/lib/store/auth/auth';
import { ExitToApp } from '@mui/icons-material';
import {
  Box,
  Toolbar,
  Divider,
  Typography,
  ListItemButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import MenuList from '../MenuList';

const CommonDrawer = () => {
  const setUserInfo = useAuthStore(
    (state) => state.setUser
  );
  const router = useRouter();
  const snackBar = useSnackbar();
  const userRole = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.id);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
    setUserInfo({ role: null, id: null });
    snackBar('안녕히 가세요.', 'success');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Toolbar />
      <Divider />
      <MenuList />
      <Box sx={{ mt: 'auto', pb: 4, mb: 1 }}>
        <Divider />
        <Typography
          sx={{ mt: 2, ml: 2 }}
        >{`권한 : ${userRole}`}</Typography>
        <Typography
          sx={{ ml: 2 }}
        >{`아이디 : ${userId}`}</Typography>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
            p: 2,
          }}
        >
          로그아웃
          <ExitToApp />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default CommonDrawer;
