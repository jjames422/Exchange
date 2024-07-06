// lib/currencyConversion.js

import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const convertToUSD = async (amount, currency) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: 'usd', // We want to convert to USD
        vs_currencies: currency.toLowerCase(), // The currency we are converting from
      }
    });
    const rates = response.data;
    if (!rates.usd[currency.toLowerCase()]) throw new Error('Unsupported currency');
    const usdAmount = amount * rates.usd[currency.toLowerCase()];
    return usdAmount;
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw new Error('Currency conversion failed');
  }
};
