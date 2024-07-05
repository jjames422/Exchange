import fetchCoinData from '@/lib/fetchCoinData';

export default async function handler(req, res) {
  const { coins } = req.query;

  try {
    const data = await fetchCoinData(coins);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch prices' });
  }
}
