'use client';

import React, { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryClientProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
