import { NextResponse } from 'next/server'

export function middleware(request) {
    let isAuth = request.cookies.get('isAuth') || {};
    if (isAuth.value !== 'true') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/protected/:path*']
}