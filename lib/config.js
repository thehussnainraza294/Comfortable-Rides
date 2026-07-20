// ============================================================
//  BUSINESS DETAILS
//  Change these and the whole site updates. Nothing here is
//  repeated anywhere else in the project.
// ============================================================

export const site = {
  name: 'Toba Rides',
  initials: 'TR',
  tagline: 'Chauffeur-driven hire',

  city: 'Toba Tek Singh',
  region: 'Punjab',
  pickupAreas: ['Toba Tek Singh', 'Gojra', 'Kamalia', 'Pir Mahal'],

  displayPhone: '0343 3348566',
  dialPhone: '+923433348566',
  whatsapp: '923433348566',

  url: 'https://tobarides.com',
};

export const destinations = [
  { city: 'Islamabad',   detail: '395 km \u00B7 5 to 6 hrs' },
  { city: 'Rawalpindi',  detail: '380 km \u00B7 5 to 6 hrs' },
  { city: 'Lahore',      detail: '265 km \u00B7 3.5 to 4 hrs' },
  { city: 'Multan',      detail: '200 km \u00B7 3 hrs' },
  { city: 'Sargodha',    detail: '145 km \u00B7 2.5 hrs' },
  { city: 'Faisalabad',  detail: '85 km \u00B7 1.5 hrs' },
  { city: 'Jhang',       detail: '60 km \u00B7 1 hr' },
  { city: 'Gojra',       detail: '29 km \u00B7 40 min' },
];

export const QUOTE_MESSAGE =
  'Hello, I would like to request a quote for a car with driver.';

export function wa(message = QUOTE_MESSAGE) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function tel() {
  return `tel:${site.dialPhone}`;
}
