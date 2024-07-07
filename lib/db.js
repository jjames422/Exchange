import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export async function connectToDatabase() {
  return await pool.connect();
}

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS fiat_wallets (
        user_id VARCHAR(255) PRIMARY KEY,
        balance DECIMAL(15, 2) NOT NULL DEFAULT 0
      );
    `);
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    client.release();
  }
}

export async function updateFiatWallet(parsedData) {
  const client = await pool.connect();
  try {
    const { userId, amountUSD } = parsedData;
    await client.query('BEGIN');
    const res = await client.query('SELECT balance FROM fiat_wallets WHERE user_id = $1', [userId]);
    let balance = res.rows.length > 0 ? res.rows[0].balance : 0;
    balance += amountUSD;
    if (res.rows.length > 0) {
      await client.query('UPDATE fiat_wallets SET balance = $1 WHERE user_id = $2', [balance, userId]);
    } else {
      await client.query('INSERT INTO fiat_wallets (user_id, balance) VALUES ($1, $2)', [userId, balance]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
