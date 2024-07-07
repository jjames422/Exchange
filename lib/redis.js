const { createClient } = require('redis');

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`,
});

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('ready', () => {
  console.log('Redis client ready');
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

module.exports = client;
