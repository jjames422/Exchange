import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(req) {
  const { userId, amount } = await req.json();

  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM fiat_wallets WHERE user_id = $1', [userId]);
    const wallet = res.rows[0];

    if (!wallet) {
      return NextResponse.json({ error: 'Fiat wallet not found' }, { status: 404 });
    }

    const newBalance = wallet.balance + amount;
    await client.query('UPDATE fiat_wallets SET balance = $1 WHERE user_id = $2', [newBalance, userId]);

    return NextResponse.json({ message: 'Deposit successful', newBalance });
  } catch (error) {
    return NextResponse.json({ error: 'Deposit failed' }, { status: 500 });
  } finally {
    client.release();
  }
}
