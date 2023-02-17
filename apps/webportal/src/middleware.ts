import { publicRoutes, publicRoutesArray } from '@webportal/constants';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = new URL(request.url).pathname;
  const token = request.cookies.get('token');
  const isPublicRoute = publicRoutesArray.includes(path);

  if (path.includes('/api')) return;
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPublicRoute || path.includes('_next')) {
    return;
  }

  if (!token) {
    return NextResponse.redirect(new URL(publicRoutes.login, request.url));
  }
}
