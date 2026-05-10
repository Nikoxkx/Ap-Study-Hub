import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Update session for all requests
  const response = await updateSession(request)
  
  // Protected routes - redirect to home if not authenticated
  const protectedPaths = ['/dashboard']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  if (isProtectedPath) {
    // Check if user has a session by looking for the auth cookie
    const hasSession = request.cookies.has('sb-unfplzqqotubcfcswnlo-auth-token') ||
                       request.cookies.has('sb-unfplzqqotubcfcswnlo-auth-token.0')
    
    if (!hasSession) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
