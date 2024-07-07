import React from 'react';
import jwt from 'jsonwebtoken';
import redisClient from '@/lib/redis';
import Dashboard from '@/components/Dashboard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  console.log('Auth token:', token);

  if (!token) {
    console.log('No auth token found, redirecting to login');
    redirect('/login');
    return <p>Redirecting...</p>;
  }

  let userId;
  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    userId = decoded.userId;
    console.log('Decoded user ID:', userId);
  } catch (err) {
    console.error('JWT verification error:', err);
    redirect('/login');
    return <p>Redirecting...</p>;
  }

  let session;
  try {
    session = await redisClient.get(`session:${userId}`);
    if (!session) {
      throw new Error('Session not found');
    }
    session = JSON.parse(session);
    console.log('Session:', session);
  } catch (err) {
    console.error('Error fetching session:', err);
    redirect('/login');
    return <p>Redirecting...</p>;
  }

  return <Dashboard session={session} />;
}
