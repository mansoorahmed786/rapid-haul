import axios from 'axios';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl;

  const res = NextResponse.next();
  res.headers.set(`x-middleware-cache`, `no-cache`);

  let token = req.cookies.get('accessToken');

  if (url.pathname === '/') {
    return NextResponse.next();
  }

  if (url.pathname === '/login') {
    if (token) {
      req.cookies.delete('accessToken');
      req.cookies.delete('refreshToken');
      req.cookies.delete('sessionid');
      req.cookies.delete('csrftoken');
    }
    return NextResponse.next();
  }

  if (token) {
    // const axiosInstance = axios.create({
    //   baseURL: process.env.BACKEND_BASE_URL,
    //   headers: {
    //     Authorization: `Bearer ${token.value}`,
    //   },
    // });

    // const response = await axiosInstance.get('/api/me/');
    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch user info');
    // }
    // const user = response.data;

    // if (url.pathname === '/admin' && user.user_type !== 'admin') {
    //   url.pathname = '/dashboard';
    //   return NextResponse.redirect(url);
    // }

    // if (
    //   url.pathname === '/dashboard' &&
    //   (user.user_type === 'driver' ||
    //     user.user_type === 'company' ||
    //     user.user_type === null)
    // ) {
    //   url.pathname = '/dashboard';
    //   return NextResponse.next();
    // }

    if (url.pathname === '/admin') {
      url.pathname = '/admin';
      return NextResponse.next();
    }
  } else {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define the routes the middleware should apply to
export const config = {
  matcher: ['/dashboard:path*', '/admin:path*', '/login'],
};
