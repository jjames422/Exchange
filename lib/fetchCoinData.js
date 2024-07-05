const fetchCoinData = async (coinIds = 'bitcoin') => {
  const API_KEY = 'CG-Z61NjzsMnRPnDvbAjNTFaUER';
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&x_cg_demo_api_key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from CoinGecko');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchCoinData;

