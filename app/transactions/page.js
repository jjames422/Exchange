'use client';
import TransactionHistory from '../../components/TransactionHistory';

export default function Transactions() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      <TransactionHistory />
    </div>
  );
}
