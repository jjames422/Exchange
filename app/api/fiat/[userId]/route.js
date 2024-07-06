import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(req, { params }) {
  const userId = params.userId;

  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM fiat_wallets WHERE user_id = $1', [userId]);
    const wallet = res.rows[0];

    if (!wallet) {
      return NextResponse.json({ error: 'Fiat wallet not found' }, { status: 404 });
    }

    return NextResponse.json({ wallet });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fiat wallet' }, { status: 500 });
  } finally {
    client.release();
  }
}
