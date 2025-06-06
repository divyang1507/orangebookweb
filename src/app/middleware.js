// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/admin')) {
    if (!token || (token.role !== 'admin' && token.role !== 'superadmin')) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
