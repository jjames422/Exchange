
export default function HomePage() {
  return (
    <>
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-5xl mb-6">Welcome to Crypto Exchange</h2>
        <p className="text-xl mb-8">Buy and sell cryptocurrency with ease.</p>
        <a href="/login" className="text-neonPink underline">Login</a>
        <span className="mx-4">|</span>
        <a href="/register" className="text-neonPink underline">Register</a>
        <div className="mt-8 bg-white dark:bg-darkBackground p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Secure Storage</h3>
          <p className="text-lg">Your cryptocurrency is safe with us.</p>
        </div>
      </div>
    </>
  );
}
