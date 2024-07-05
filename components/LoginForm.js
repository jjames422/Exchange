import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      // Save the token and redirect to dashboard
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } else {
      // Handle login error
      setError(data.error);
    }
  };

  return (
    <div className={darkMode ? 'bg-darkPurple text-white' : 'bg-background text-black'}>
      <header className="p-6 bg-lightPurple flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crypto Exchange</h1>
        <button
          className="bg-accent text-white px-4 py-2 rounded"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white dark:bg-darkPurple p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Sign in to Crypto Exchange</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium dark:text-white" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-darkPurple dark:text-white dark:border-gray-600"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-white" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-darkPurple dark:text-white dark:border-gray-600"
                placeholder="Your password"
              />
            </div>
            <button className="w-full bg-accent text-white p-3 rounded-lg font-semibold">Continue</button>
          </form>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
          <div className="my-6 text-center text-gray-600 dark:text-gray-400">OR</div>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-white">
              <span className="mr-2">Sign in with Passkey</span>
            </button>
            <button className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-white">
              <img src="/google-icon.svg" alt="Google" className="w-6 h-6 mr-2" />
              <span>Sign in with Google</span>
            </button>
            <button className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-white">
              <img src="/apple-icon.svg" alt="Apple" className="w-6 h-6 mr-2" />
              <span>Sign in with Apple</span>
            </button>
            <button className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-white">
              <span className="mr-2">Sign in with Wallet</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-lightPurple p-6 text-center">
        <p className="text-white">&copy; 2024 Crypto Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginForm;
