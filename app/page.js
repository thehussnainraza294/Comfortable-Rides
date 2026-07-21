'use client';

import { useEffect, useState } from 'react';
import { site, destinations, serviceTypes } from '../lib/config';
import { listVehicles, getBannerUrl } from '../lib/api';
import { Header, Footer, StickyBar } from '../components/Chrome';
import Banner from '../components/Banner';
import Fleet from '../components/Fleet';
import { Services, Coverage, Pricing, Booking, WhyUs, Faq, ClosingBand } from '../components/Sections';

// Structured data. This is what search engines read to understand the
// business. Everything comes from lib/config.js, so changing the business
// name or phone number there updates this automatically.
const ALL_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const openAllHours = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ALL_WEEK,
  opens: '00:00',
  closes: '23:59',
};

const areaServed = [...site.pickupAreas, ...destinations.map((d) => d.city)]
  .filter((city, i, all) => all.indexOf(city) === i)
  .map((name) => ({ '@type': 'City', name }));

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#business`,
  name: site.name,
  description:
    `Chauffeur-driven car rental from ${site.city} to Islamabad, Lahore, Faisalabad ` +
    `and across ${site.region}. Own fleet, own drivers, fixed quotes with fuel and tolls included.`,
  url: site.url,
  telephone: site.dialPhone,
  priceRange: site.priceRange,
  openingHoursSpecification: openAllHours,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed,
  makesOffer: serviceTypes.map((name) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name },
  })),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.dialPhone,
    contactType: 'reservations',
    availableLanguage: site.languages,
    hoursAvailable: openAllHours,
  },
  sameAs: [`https://wa.me/${site.whatsapp}`],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}