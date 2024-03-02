'use client';

import { useAuthStore } from '@/lib/store/auth/auth';
import { Role } from '@/model/user';
import { redirect } from 'next/navigation';

const AdminLayout = () => {
  const role = useAuthStore((state) => state.role);
  if (role !== Role.ADMIN) {
    redirect('/dashboard');
  }
};

export default AdminLayout;
