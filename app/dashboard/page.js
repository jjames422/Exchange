import React from 'react';
import jwt from 'jsonwebtoken';
import redisClient from '@/lib/redis';
import Dashboard from '@/components/Dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');

  if (!token) {
    redirect('/login');
    return <p>Redirecting...</p>;
  }

  let userId;
  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
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
  } catch (err) {
    redirect('/login');
    return <p>Redirecting...</p>;
  }

  return (
    <DashboardLayout>
      <Dashboard session={session} />
    </DashboardLayout>
  );
}
