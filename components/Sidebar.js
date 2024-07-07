'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = Cookies.get('userId'); // Assuming userId is stored in cookies
      if (!userId) {
        console.error('User ID not found in cookies');
        return;
      }

      try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserName(data.username);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-darkBackground text-darkText p-4 font-pixel w-full sm:w-64`}>
      <button onClick={toggleSidebar} className="text-2xl text-neonPink mb-4">&times;</button>
      <div className="logo text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neonYellow">{userName ? userName : 'MyCryptoApp'}</h1>
        <p className="text-xs md:text-sm text-neonBlue">Retro 80s Crypto Exchange</p>
      </div>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="text-lg block hover:text-neonPink">Dashboard</Link>
        </li>
        <li>
          <Link href="/profile" className="text-lg block hover:text-neonGreen">Profile</Link>
        </li>
        <li>
          <Link href="/settings" className="text-lg block hover:text-neonPurple">Settings</Link>
        </li>
        <li>
          <Link href="/upload" className="text-lg block hover:text-neonBlue">Upload</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
