"use client";

import React, { useEffect, useState } from 'react';

const Dashboard = ({ session }) => {
  const [fiatWallet, setFiatWallet] = useState(null);
  const [cryptoAssets, setCryptoAssets] = useState([]);

  useEffect(() => {
    // Fetch fiat wallet data
    fetch(`/api/fiat/${session.userId}`)
      .then(response => response.json())
      .then(data => setFiatWallet(data))
      .catch(error => console.error('Error fetching fiat wallet data:', error));

    // Fetch crypto assets data
    fetch(`/api/crypto/assets/${session.userId}`)
      .then(response => response.json())
      .then(data => setCryptoAssets(data))
      .catch(error => console.error('Error fetching crypto assets data:', error));
  }, [session.userId]);

  return (
    <div className="p-6 min-h-screen bg-darkBackground text-darkText font-pixel">
      <h1 className="text-2xl font-bold mb-4 text-neonPink">
        Welcome, {session.email}
      </h1>
      <p className="mb-6 text-neonBlue">Your user ID is: {session.userId}</p>

      {fiatWallet && (
        <div className="mb-6 p-4 bg-darkBackground text-lightText rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-neonGreen">Fiat Wallet</h2>
          <p className="text-lg text-neonYellow">Balance: {fiatWallet.balance}</p>
          <p className="text-lg text-neonPurple">Currency: {fiatWallet.currency}</p>
        </div>
      )}

      {cryptoAssets.length > 0 && (
        <div className="p-4 bg-darkBackground text-lightText rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-neonGreen">My Assets</h2>
          {cryptoAssets.map((asset, index) => (
            <div key={index} className="mb-2">
              <p className="text-lg text-neonYellow">Crypto: {asset.name}</p>
              <p className="text-lg text-neonBlue">Amount: {asset.amount}</p>
              <p className="text-lg text-neonPurple">Value: {asset.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
