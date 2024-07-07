import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

let dbInitialized = false;

export async function middleware(request) {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('Failed to initialize the database:', error);
      return NextResponse.error();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',  // Apply this middleware only to API routes
};
