import './globals.css';
import { site } from '../lib/config';

export const metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Chauffeur-Driven Car Rental, ${site.city}`,
  description: `Chauffeur-driven car rental from ${site.city} to Islamabad, Lahore, Faisalabad and across ${site.region}. Our own fleet, our own drivers, fixed quotes with fuel and tolls included. Call ${site.displayPhone}.`,
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: site.name,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
