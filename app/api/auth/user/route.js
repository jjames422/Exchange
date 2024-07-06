import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken, getSession } from '@/lib/auth';

export async function GET(req) {
  try {
    const token = req.cookies.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token not provided' }, { status: 401 });
    }

    const userId = verifyToken(token);

    const session = await getSession(userId);
    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT id, email, name FROM users WHERE id = $1', [userId]);
      const user = result.rows[0];

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
