import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';

    const token = request.cookies.get('token')?.value;

    if(isPublicPath && token) {
        // If the user is logged in and tries to access a public path, redirect to profile
        return NextResponse.redirect(new URL('/', request.nextUrl));
    } else if (!isPublicPath && !token) {
        // If the user is not logged in and tries to access a protected path, redirect to login
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
  ]
}