'use client';

import CommonLayout from '@/components/commonLayout/CommonLayout';
import { useMyInfo } from '@/hooks/useAuthData';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PrivateAuthProvider: FC<Props> = ({ children }) => {
  const { data, error, isFetching } = useMyInfo();

  if ((!isFetching && !data) || error) {
    return <></>;
  }

  return <CommonLayout>{children}</CommonLayout>;
};

export default PrivateAuthProvider;
