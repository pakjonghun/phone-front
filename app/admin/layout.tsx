import CommonLayout from '@/components/commonLayout/CommonLayout';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminLayout: FC<Props> = ({ children }) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default AdminLayout;
