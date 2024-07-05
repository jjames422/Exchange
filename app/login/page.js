'use client';
import LoginForm from '@/components/LoginForm.js';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-darkPurple text-black dark:text-white">
      <LoginForm />
    </div>
  );
}
