// components/Sidebar.js

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar bg-darkBackground text-darkText h-screen p-4 font-pixel">
      <div className="logo text-center mb-8">
        <h1 className="text-4xl font-bold text-neonYellow">Lullipop</h1>
        <p className="text-sm text-neonBlue">Retro 80s Crypto Exchange</p>
      </div>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard">
            <a className="text-lg block hover:text-neonPink">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a className="text-lg block hover:text-neonGreen">Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a className="text-lg block hover:text-neonPurple">Settings</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
