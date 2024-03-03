import { NextRequest, NextResponse } from 'next/server';
import { serverMe } from './api/user';

export async function middleware(req: NextRequest) {
  const userInfo = await serverMe();

  if (req.nextUrl.pathname === '/login') {
    if (userInfo) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    if (!userInfo) {
      return NextResponse.redirect(
        new URL('/login', req.url)
      );
    }

    if (req.nextUrl.pathname.includes('admin')) {
      if (userInfo.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/search/:path*',
    '/admin/:path*',
  ],
};
