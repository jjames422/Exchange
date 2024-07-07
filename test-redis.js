const { createClient } = require('redis');

// Log environment variables to ensure they are set correctly
console.log('REDIS_HOST:', process.env.REDIS_HOST);
console.log('REDIS_PORT:', process.env.REDIS_PORT);
console.log('REDIS_DB:', process.env.REDIS_DB);

// Create a Redis client and connect to database 2
const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`,
});

console.log('Initializing Redis client...');

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('ready', async () => {
  console.log('Redis client ready');

  try {
    // Perform the set operation
    const setResult = await client.set('test_key', 'test_value');
    console.log('Set key reply:', setResult);

    // Perform the get operation
    const getResult = await client.get('test_key');
    console.log('Get key reply:', getResult);

  } catch (error) {
    console.error('Error during Redis operations:', error);
  } finally {
    // Close the Redis client after the test
    client.quit((err, res) => {
      if (err) {
        console.error('Error closing Redis client:', err);
      } else {
        console.log('Redis client closed:', res);
      }
    });
  }
});

client.on('end', () => {
  console.log('Redis client connection ended');
});

client.on('reconnecting', (delay, attempt) => {
  console.log(`Reconnecting to Redis: attempt ${attempt}, delay ${delay}ms`);
});

client.on('warning', (warning) => {
  console.warn('Redis warning:', warning);
});

// Explicitly connect to Redis to ensure connection is established
(async () => {
  try {
    await client.connect();
    console.log('Explicit connection established');
  } catch (error) {
    console.error('Error establishing explicit connection:', error);
  }
})();
