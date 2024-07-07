'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard-data');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Error fetching dashboard data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="dashboard-content bg-darkBackground text-darkText">
          <h1 className="text-3xl md:text-4xl font-bold text-neonYellow">Dashboard</h1>
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-content bg-darkBackground text-darkText">
        <h1 className="text-3xl md:text-4xl font-bold text-neonYellow">Dashboard</h1>
        <div>
          <h2 className="text-2xl font-bold text-neonGreen">Fiat Wallet Balance: ${data?.fiatBalance || 0}</h2>
          {data?.cryptoAssets && data.cryptoAssets.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-neonBlue">My Assets</h2>
              <ul>
                {data.cryptoAssets.map((asset, index) => (
                  <li key={index} className="text-lg text-neonPurple">
                    {asset.asset_name}: {asset.amount}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-lg text-neonPink">No crypto assets available</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
