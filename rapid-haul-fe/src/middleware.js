import { NextResponse } from 'next/server';
import { fetchUser } from '@/store/userSlice';

export async function middleware(req) {
  console.log("----------------->>>>>.")
  const url = req.nextUrl;
  const res = NextResponse.next();
  res.headers.set('x-middleware-cache', 'no-cache');

  let token = req.cookies.get('accessToken');
  
  console.log(token)


  // Allow public routes
  if (url.pathname === '/') {
    return NextResponse.next();
  }

  // Handle logout by clearing cookies
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
    try {

      const user = await fetchUser(token);
      console.log('User B:', user);

      // update the user_type and assign the user_type driver
      if (user.user_type === null) {
        user.user_type = 'admin';
      }

      console.log('User:', user);


      // Redirect non-admin users away from the admin panel
      if (url.pathname === '/admin' && user.user_type !== 'admin') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }

      // Allow dashboard access based on user type
      if (
        url.pathname === '/dashboard' &&
        (user.user_type === 'driver' || user.user_type === 'company' || user.user_type === null)
      ) {
        return NextResponse.next();
      }

      // Allow admins to access the admin panel
      if (url.pathname === '/admin' && user.user_type === 'admin') {
        return NextResponse.next();
      }
    } catch (error) {
      debugger;
      console.error('Error fetching user:', error.message);
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  } else {
    // Redirect to login if no token is present
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define the routes the middleware should apply to
export const config = {
  matcher: ['/dashboard:path*', '/admin:path*', '/login'],
};

