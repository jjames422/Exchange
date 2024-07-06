'use client';

import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Loading from '@/components/Loading';
import axios from 'axios';

const DashboardPage = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/api/auth/user', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUserId(response.data.id);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  if (loading) return <Loading />;
  if (!userId) return <p>Error fetching user ID</p>;

  return (
    <div>
      <Dashboard userId={userId} />
    </div>
  );
};

export default DashboardPage;
