'use client';
import * as React from 'react';
import MenuList from './MenuList';
import { usePathname, useRouter } from 'next/navigation';
import { AppBar } from '@mui/material';
import { useSnackbar } from '@/context/SnackBarProvicer';
import {
  logout,
  useMyInfo,
} from '@/hooks/auth/useAuthData';
import { useAuthStore } from '@/lib/store/auth/auth';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ExitToApp } from '@mui/icons-material';

export const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function CommonLayout(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const userRole = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.id);
  const setUserInfo = useAuthStore(
    (state) => state.setUser
  );
  const { data, isFetching } = useMyInfo();

  React.useEffect(() => {
    if (!isFetching && data) {
      setUserInfo(data);
    }
  }, [data, isFetching, setUserInfo]);

  const router = useRouter();
  const snackBar = useSnackbar();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
    setUserInfo({ role: null, id: null });
    snackBar('안녕히 가세요.', 'success');
  };

  const drawer = (
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

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined
      ? () => window().document.body
      : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            판매・매입 관리
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          height: '100%',
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
