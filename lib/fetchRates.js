const API_KEY = 'CG-Z61NjzsMnRPnDvbAjNTFaUER';

const fetchRates = async () => {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,shiba-inu,baby-doge-coin,litecoin,usd-coin,polygon&vs_currencies=usd&x_cg_pro_api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

export default fetchRates;
