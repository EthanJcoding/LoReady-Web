import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  console.log('📍Middleware x-pathname', requestHeaders.get('x-pathname'))

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|$|login).*)']
}
