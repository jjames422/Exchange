import { pool } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  const { amount } = await req.json();
  const token = req.cookies.get('token');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }

  try {
    const res = await pool.query('SELECT balance FROM fiat_wallets WHERE user_id = $1', [userId]);
    let balance = res.rows[0] ? res.rows[0].balance : 0;
    balance += amount;

    if (res.rows.length > 0) {
      await pool.query('UPDATE fiat_wallets SET balance = $1 WHERE user_id = $2', [balance, userId]);
    } else {
      await pool.query('INSERT INTO fiat_wallets (user_id, balance) VALUES ($1, $2)', [userId, balance]);
    }

    return new Response(JSON.stringify({ message: 'Deposit successful' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
