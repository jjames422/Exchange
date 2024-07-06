"use client";

import React, { useEffect, useState } from 'react';
import fetchRates from '@/lib/fetchRates';
import LiveChart from '@/components/LiveChart';
import FileUpload from '@/components/FileUpload';
import axios from 'axios';
import Loading from '@/components/Loading';

const Dashboard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [rates, setRates] = useState({});
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [fiatWallet, setFiatWallet] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/user/${userId}`);
        const userData = await userResponse.json();

        if (userResponse.ok) {
          setUserData(userData);
        } else {
          setError(userData.message);
        }

        const ratesData = await fetchRates();
        setRates(ratesData);

        // Mock data for chart; replace with actual data fetching logic
        const mockChartData = [
          { time: new Date().getTime(), price: ratesData.bitcoin.usd },
          // Add more data points here
        ];
        setChartData(mockChartData);

        // Fetch fiat wallet data
        const walletResponse = await axios.get(`/api/fiat/${userId}`);
        setFiatWallet(walletResponse.data.wallet);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [userId]);

  const handleUploadSuccess = async (details) => {
    setTransactionDetails(details);
    try {
      const walletResponse = await axios.get(`/api/fiat/${userId}`);
      setFiatWallet(walletResponse.data.wallet);
    } catch (err) {
      setError('Failed to refresh fiat wallet data.');
    }
  };

  if (!userData || !fiatWallet) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-darkBackground text-white min-h-screen">
      <header className="p-6 bg-darkPurple flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crypto Exchange</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">8</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-1.104-.896-2-2-2h-4c-1.104 0-2 .896-2 2v3.158a2.032 2.032 0 01-.595 1.437L7 17h5m0 0v2a2 2 0 11-4 0v-2m4 0a2 2 0 104 0v-2"></path>
            </svg>
          </div>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path>
          </svg>
        </div>
      </header>
      <main className="p-6 space-y-6">
        <div>
          <h2 className="text-lg">Total balance</h2>
          <p className="text-3xl font-bold">${userData.balance}</p>
          <p className="text-sm text-red-500 mt-1">Market is down <span>{(rates.bitcoin?.usd * userData.balance) / 100}</span></p>
        </div>
        <div>
          <h2 className="text-lg mb-4">In the past 24 hours</h2>
          <ul className="space-y-4">
            {userData.investments.map((investment) => (
              <li key={investment.coin} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full ${investment.coin}`}></div>
                  <span>{investment.coin} ({investment.coin.toUpperCase()})</span>
                </div>
                <div className="text-right">
                  <span className="block">${rates[investment.coin]?.usd}</span>
                  <span className={`block ${investment.coin}`}>{investment.change}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <LiveChart data={chartData} />
        </div>
        <div>
          <h2 className="text-lg mb-4">Upload MT103 File</h2>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          {transactionDetails && (
            <div>
              <h2>Transaction Details</h2>
              <pre>{JSON.stringify(transactionDetails, null, 2)}</pre>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg mb-4">Fiat Wallet</h2>
          <p className="text-2xl font-bold">Balance: ${fiatWallet.balance}</p>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-darkPurple p-4 flex justify-around">
        {[
          { name: 'Home', icon: 'home' },
          { name: 'My assets', icon: 'wallet' },
          { name: 'Trade', icon: 'chart' },
          { name: 'Explore', icon: 'search' },
          { name: 'Earn', icon: 'percent' },
        ].map((item) => (
          <button key={item.name} className="flex flex-col items-center">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={`M${item.icon}`}></path>
            </svg>
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </footer>
    </div>
  );
};

export default Dashboard;
