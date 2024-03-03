import { NextRequest, NextResponse } from 'next/server';
import { serverMe } from './api/user';

export async function middleware(req: NextRequest) {
  const userInfo = await serverMe();
  console.log('middle userInfo', userInfo);

  if (req.nextUrl.pathname === '/') {
    if (userInfo) {
      console.log(
        'not logined but and has userInfo to /dashboard'
      );
      return NextResponse.redirect(
        new URL('/dashboard', req.url)
      );
    }
  } else {
    if (!userInfo) {
      console.log('logined but no userInfo to /');
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
