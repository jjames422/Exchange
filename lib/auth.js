import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisClient from './redis';

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export async function getSession(userId) {
  try {
    const session = await redisClient.get(`session:${userId}`);
    if (!session) {
      throw new Error('Session not found');
    }
    return JSON.parse(session);
  } catch (err) {
    throw new Error(`Error fetching session: ${err.message}`);
  }
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
