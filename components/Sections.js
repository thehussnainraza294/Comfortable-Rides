import { site, destinations, wa, tel, QUOTE_MESSAGE } from '../lib/config';

const services = [
  ['Intercity journeys', 'One way drops and same day return trips to Islamabad, Lahore, Faisalabad, Multan and other cities across Punjab.'],
  ['Airport transfers', 'Drop offs and pick ups at Islamabad, Lahore, Faisalabad and Multan airports. We plan departure around your flight time and build in extra margin for the road.'],
  ['Medical travel', 'Hospital appointments in Islamabad, Lahore and Faisalabad, including waiting time and the return journey on the same day where required.'],
  ['Weddings and events', 'Vehicles for baraat, walima and guest transport, arranged in advance and reserved for the full day.'],
  ['Full day hire', 'A car and driver at your disposal for the day, whether you are visiting several places in one city or travelling between towns.'],
  ['Multi-day tours', 'Extended bookings across several days, with the same driver throughout. Rates for longer bookings are considerably better.'],
];

const pricing = [
  ['01', 'Quoted before you book', 'Send us your route, date and passenger count. We reply with a firm figure, usually within a few minutes.'],
  ['02', 'The quote is what you pay', 'The figure we agree at booking is the figure you pay at the end. There is no surge, no adjustment mid-journey and no renegotiation on arrival.'],
  ['03', 'Everything is included', "Fuel, motorway and road tolls, and the driver's meals are all covered by the quoted rate. You will not be asked for anything extra on the road."],
  ['04', 'Payment on completion', 'Settle in cash with the driver at the end of the journey. Advance payment is not required for standard bookings.'],
];

const steps = [
  ['Tell us the journey', 'Where you are travelling from and to, which date, how many passengers, and whether you need a return.'],
  ['We confirm the details', 'You receive a firm quote along with vehicle availability, usually within a few minutes of getting in touch.'],
  ['The car arrives', "You receive the driver's name and the vehicle registration in advance, and the driver shares his live location once the journey begins."],
];

const why = [
  ['Ownership', 'We own the fleet', 'Many local operators pass your booking on to whichever car they can find. We do not. Every vehicle is ours and every driver is on our team, so accountability sits with us and nowhere else.'],
  ['Safety', 'Live location, every journey', 'The driver shares his live location over WhatsApp as soon as the journey starts. Forward it to your family and they can follow the entire route.'],
  ['Transparency', 'No hidden extras', 'Fuel, tolls and driver meals are built into the quote. Nothing is added at a service station, a toll plaza or on arrival.'],
  ['Availability', 'Round the clock', 'Early morning flights, late night hospital runs and everything in between. We answer the phone at any hour, every day of the week.'],
];

const faqs = [
  ['How do I get a price for my journey?', "Send us a WhatsApp message or call with your route, travel date and passenger count. We reply with a firm quote, usually within a few minutes. The quote covers fuel, tolls and the driver's meals."],
  ['Can the price change during the journey?', 'No. The figure agreed at booking is the figure you pay at the end. Nothing is added for fuel, tolls or meals along the way.'],
  ['When and how do I pay?', 'In cash to the driver once the journey is complete. Advance payment is not required for standard bookings. For multi-day tours and wedding reservations we may ask for a partial advance, which is always agreed beforehand.'],
  ['Do you operate at night?', 'Yes, we are available around the clock. Many customers travel overnight for early morning flights. Night journeys may be quoted slightly higher, and this is always stated upfront.'],
  ['How far in advance should I book?', 'For long journeys, a day in advance is best, particularly where a flight or hospital appointment is involved. Shorter local journeys can often be arranged within a few hours.'],
  ['Do you collect from outside Toba Tek Singh city?', 'Yes. We collect from anywhere in the district, including Gojra, Kamalia, Pir Mahal and Rajana. Any difference this makes to the rate is included in your original quote.'],
  ['Do you handle airport transfers?', 'Yes, for Islamabad, Lahore, Faisalabad and Multan. Give us your flight time and we will plan the departure accordingly, with additional margin built in for traffic and road conditions.'],
  ['Can I book a vehicle for a wedding?', 'Yes. Wedding bookings are reserved for the full day and quoted separately. Larger vehicles are available for guest transport.'],
];

export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="cap">Services</div>
        <h2>What we are booked for</h2>
        <p className="sectionsub">
          Most of our work falls into these categories. If your journey is not listed, ask anyway.
        </p>
        <div className="svc">
          {services.map(([title, body]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Coverage() {
  return (
    <section id="destinations">
      <div className="wrap">
        <div className="cap">Coverage</div>
        <h2>Where we travel</h2>
        <p className="sectionsub">
          We collect from anywhere in {site.city} district and travel throughout {site.region}.
          These are our most frequent destinations.
        </p>
        <div className="dest">
          {destinations.map((d) => (
            <span key={d.city}>
              <b>{d.city}</b>
              <i>{d.detail}</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="cap">Pricing</div>
        <h2>How pricing works</h2>
        <p className="sectionsub">
          The rate depends on the vehicle, the distance, the time of day and whether you need a
          return journey. Rather than publish a figure that would not fit your journey, we quote
          properly before you commit.
        </p>
        <div className="grid2">
          {pricing.map(([n, title, body]) => (
            <div className="pcard" key={n}>
              <div className="n">{n}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <section id="booking">
      <div className="wrap">
        <div className="cap">Booking</div>
        <h2>Three steps, no forms</h2>
        <p className="sectionsub">
          There is no app to install and no account to create. A single message or phone call is enough.
        </p>
        <div className="steps">
          {steps.map(([title, body]) => (
            <div className="step" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="cap">Why us</div>
        <h2>What sets this apart</h2>
        <div className="grid2">
          {why.map(([label, title, body]) => (
            <div className="pcard" key={title}>
              <div className="n">{label}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="cap">Questions</div>
        <h2>Frequently asked</h2>
        <div className="faq">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingBand() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="cap">Get in touch</div>
        <h2>Tell us where you need to be</h2>
        <p>Send a message or call, and you will have a firm quote and a confirmed vehicle within minutes.</p>
        <a className="big" href={tel()}>{site.displayPhone}</a>
        <div className="biglabel">Available 24 hours, every day</div>
        <div className="ctas">
          <a className="btn btn-wa btn-lg" style={{ background: '#fff', color: 'var(--brand)' }} href={wa(QUOTE_MESSAGE)}>
            Request a quote on WhatsApp
          </a>
          <a className="btn btn-line btn-lg" href={tel()}>Call us</a>
        </div>
      </div>
    </section>
  );
}
