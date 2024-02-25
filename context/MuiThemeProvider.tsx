'use client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

const theme = createTheme();

interface Props {
  children: ReactNode;
}

const MuiThemeProvider: FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
