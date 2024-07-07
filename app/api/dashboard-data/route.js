import { pool } from '@/lib/db';
import Cookies from 'js-cookie';

export async function GET(req) {
  const token = req.cookies.get('token');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }

  try {
    const fiatRes = await pool.query('SELECT balance FROM fiat_wallets WHERE user_id = $1', [userId]);
    const fiatBalance = fiatRes.rows[0] ? fiatRes.rows[0].balance : 0;

    const cryptoRes = await pool.query('SELECT * FROM crypto_wallets WHERE user_id = $1', [userId]);
    const cryptoAssets = cryptoRes.rows;

    return new Response(JSON.stringify({ fiatBalance, cryptoAssets }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
