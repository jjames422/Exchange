'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkBackground text-neonGreen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-8 bg-darkBackground border border-neonGreen rounded">
        <h1 className="mb-6 text-2xl font-pixel text-neonPink">Login</h1>
        {error && <p className="mb-4 text-neonRed">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-neonYellow">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 bg-darkBackground text-neonGreen border border-neonGreen rounded focus:outline-none focus:ring-2 focus:ring-neonPink"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-neonYellow">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 bg-darkBackground text-neonGreen border border-neonGreen rounded focus:outline-none focus:ring-2 focus:ring-neonPink"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-neonPurple text-darkText border border-neonGreen rounded hover:bg-neonPink focus:outline-none focus:ring-2 focus:ring-neonGreen"
        >
          Login
        </button>
      </form>
    </div>
  );
}
