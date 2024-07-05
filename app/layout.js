import '@/app/globals.css';

export const metadata = {
  title: 'Crypto Exchange',
  description: 'Buy and sell cryptocurrency with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-pixel">
        {children}
      </body>
    </html>
  );
}
