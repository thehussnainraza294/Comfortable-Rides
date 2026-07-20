'use client';

import { useEffect, useState } from 'react';
import { site } from '../lib/config';
import { listVehicles, getBannerUrl } from '../lib/api';
import { Header, Footer, StickyBar } from '../components/Chrome';
import Banner from '../components/Banner';
import Fleet from '../components/Fleet';
import { Services, Coverage, Pricing, Booking, WhyUs, Faq, ClosingBand } from '../components/Sections';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  name: site.name,
  description: `Chauffeur-driven car rental from ${site.city} across ${site.region}.`,
  telephone: site.dialPhone,
  url: site.url,
  areaServed: site.pickupAreas.map((c) => ({ '@type': 'City', name: c })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: 'PK',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
};

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [banner, setBanner] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      const [v, b] = await Promise.all([listVehicles(), getBannerUrl()]);
      if (!alive) return;
      setVehicles(v);
      setBanner(b);
    })();
    return () => { alive = false; };
  }, []);

  return (
    <>
      <Header />
      <Banner photoUrl={banner} />
      <Fleet vehicles={vehicles} />
      <Services />
      <Coverage />
      <Pricing />
      <Booking />
      <WhyUs />
      <Faq />
      <ClosingBand />
      <Footer />
      <StickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
