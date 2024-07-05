import { NextResponse } from 'next/server';
import Web3 from 'web3';
import { pool } from '@/lib/db';
import { decrypt } from '@/lib/encryption';

const web3 = new Web3(process.env.INFURA_URL);

export async function POST(req) {
  const { userId, fiatAmount, cryptoType } = await req.json();

  const client = await pool.connect();
  try {
    const fiatWalletRes = await client.query('SELECT * FROM fiat_wallets WHERE user_id = $1', [userId]);
    const fiatWallet = fiatWalletRes.rows[0];

    if (!fiatWallet) {
      return NextResponse.json({ error: 'Fiat wallet not found' }, { status: 404 });
    }

    const exchangeRate = await getLiveExchangeRate(cryptoType.toLowerCase());
    const cryptoAmount = fiatAmount / exchangeRate;

    const newFiatBalance = fiatWallet.balance - fiatAmount;
    await client.query('UPDATE fiat_wallets SET balance = $1 WHERE user_id = $2', [newFiatBalance, userId]);

    const cryptoWalletRes = await client.query('SELECT * FROM crypto_wallets WHERE user_id = $1 AND crypto_type = $2', [userId, cryptoType]);
    const cryptoWallet = cryptoWalletRes.rows[0];

    if (!cryptoWallet) {
      return NextResponse.json({ error: `${cryptoType} wallet not found` }, { status: 404 });
    }

    const newCryptoBalance = cryptoWallet.balance + cryptoAmount;
    await client.query('UPDATE crypto_wallets SET balance = $1 WHERE user_id = $2 AND crypto_type = $3', [newCryptoBalance, userId, cryptoType]);

    return NextResponse.json({ message: 'Conversion successful', cryptoAmount, newFiatBalance, newCryptoBalance });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    client.release();
  }
}

async function getLiveExchangeRate(cryptoType) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoType}&vs_currencies=usd`);
  const data = await response.json();
  return data[cryptoType].usd;
}
