const { pool } = require('@/lib/db');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');
const bcrypt = require('bcrypt');
const redisClient = require('@/lib/redis');

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store session in Redis
    const session = { userId: user.id, email: user.email };
    await redisClient.set(`session:${user.id}`, JSON.stringify(session), 'EX', 3600);
    console.log('Session stored in Redis:', session);

    const serialized = serialize('auth_token', token, { httpOnly: true, path: '/' });
    return new Response(JSON.stringify({ token }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': serialized } });

  } catch (err) {
    console.error('Error during login:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
