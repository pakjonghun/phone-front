import { NextRequest, NextResponse } from 'next/server';
import { serverMe } from './api/user';

export async function middleware(req: NextRequest) {
  const userInfo = await serverMe();

  if (req.nextUrl.pathname === '/') {
    if (userInfo) {
      return NextResponse.redirect(
        new URL('/dashboard', req.url)
      );
    }
  } else {
    if (!userInfo) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/search/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
