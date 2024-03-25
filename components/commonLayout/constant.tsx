import { MenuItem } from './type';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const menuList: MenuItem[] = [
  {
    id: 'dashboard',
    name: '대시보드',
    icon: <DashboardIcon />,
  },
  {
    id: 'sale',
    name: '판매관리',
    icon: <ShoppingCartIcon />,
  },
  {
    id: 'purchase',
    name: '매입관리',
    icon: <ShoppingCartIcon />,
  },
  {
    id: 'admin',
    name: '관리자',
    icon: <SettingsIcon />,
  },
];
