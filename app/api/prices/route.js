export async function GET(req) {
  try {
    const { coins } = req.query; // Ensure req.query is only used here
    if (!coins) {
      return new Response(JSON.stringify({ message: 'Coins query parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch prices logic
    const prices = await fetchPrices(coins); // Assume fetchPrices is a function that fetches prices

    return new Response(JSON.stringify(prices), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
