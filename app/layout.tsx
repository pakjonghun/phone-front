import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MuiThemeProvider from '@/context/MuiThemeProvider';
import { CssBaseline } from '@mui/material';
import SnackBarProvider from '@/context/SnackBarProvicer';
import ReactQueryClientProvider from '@/context/ReactQueryClientProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CommonLayout from '@/components/commonLayout/CommonLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '판매 매입 관리',
  description: '휴대폰 판매과 매입 현황을 관리합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        style={{
          height: '100vh',
          minWidth: '800px',
        }}
        className={inter.className}
      >
        <AppRouterCacheProvider>
          <CssBaseline />
          <MuiThemeProvider>
            <SnackBarProvider>
              <ReactQueryClientProvider>
                <CommonLayout>{children}</CommonLayout>
              </ReactQueryClientProvider>
            </SnackBarProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
