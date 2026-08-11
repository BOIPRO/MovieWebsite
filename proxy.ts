import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LRUCache } from 'lru-cache';

const ipCache = new LRUCache<string, { count: number; resetTime: number }>({
  max: 5000,
  ttl: 60 * 1000, 
});

const LIMIT = 30; 
const WINDOW_MS = 60 * 1000;

export function proxy(request: NextRequest) {
  console.log('--- MIDDLEWARE DA CHAY CHO URL:', request.url);
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor 
    ? forwardedFor.split(',')[0].trim() 
    : (request.headers.get('x-real-ip') ?? '127.0.0.1');

  const now = Date.now();
  const tokenData = ipCache.get(clientIp);

  if (!tokenData || now > tokenData.resetTime) {
    ipCache.set(clientIp, { count: 1, resetTime: now + WINDOW_MS });
  } else {
    tokenData.count++;
    
    if (tokenData.count > LIMIT) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Too many requests from this IP, please try again later.' 
        }),
        { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/bemovie|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};