import React from 'react';

const Dashboard = ({ session }) => {
  return (
    <div>
      <h1>Welcome, {session.email}</h1>
      <p>Your user ID is: {session.userId}</p>
    </div>
  );
};

export default Dashboard;
