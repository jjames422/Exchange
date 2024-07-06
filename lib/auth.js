import jwt from 'jsonwebtoken';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export async function getSession(userId) {
  const session = await redis.get(`session:${userId}`);
  if (!session) {
    throw new Error('Session not found');
  }
  return JSON.parse(session);
}
