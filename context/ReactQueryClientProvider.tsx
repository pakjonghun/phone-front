'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryClientProvider: FC<Props> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
