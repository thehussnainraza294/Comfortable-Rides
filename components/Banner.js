import { site, wa, tel, QUOTE_MESSAGE } from '../lib/config';
import { WaIcon, Tick } from './Chrome';

// The road graphic below is drawn in code, so the banner always looks
// finished. If the admin uploads a photo it sits on top of this, and the
// dark overlay keeps the heading readable whatever the photo looks like.
function RoadArt() {
  return (
    <div className="banner-art" aria-hidden="true">
      <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice">
        <g stroke="#ffffff" fill="none" strokeLinecap="round">
          <line x1="0" y1="286" x2="1200" y2="286" strokeOpacity=".14" strokeWidth="1" />
          <path d="M640 286 L200 520" strokeOpacity=".10" strokeWidth="1.4" />
          <path d="M640 286 L1080 520" strokeOpacity=".10" strokeWidth="1.4" />
          <path d="M640 286 L420 520" strokeOpacity=".055" strokeWidth="1" />
          <path d="M640 286 L860 520" strokeOpacity=".055" strokeWidth="1" />
          <g strokeOpacity=".16" strokeWidth="3">
            <path d="M640 296 L638 306" />
            <path d="M636 320 L632 338" />
            <path d="M629 358 L622 388" />
            <path d="M616 414 L604 462" />
            <path d="M596 494 L582 520" />
          </g>
          <g strokeOpacity=".05" strokeWidth="1">
            <line x1="0" y1="316" x2="1200" y2="316" />
            <line x1="0" y1="352" x2="1200" y2="352" />
            <line x1="0" y1="400" x2="1200" y2="400" />
            <line x1="0" y1="462" x2="1200" y2="462" />
          </g>
          <g strokeOpacity=".13" strokeWidth="1.6">
            <path d="M120 286 V214" />
            <path d="M104 214 h32" />
            <path d="M1058 286 V206" />
            <path d="M1042 206 h32" />
          </g>
          <g strokeOpacity=".07" strokeWidth="1.2">
            <path d="M232 286 V246" />
            <path d="M300 286 V258" />
            <path d="M368 286 V266" />
            <path d="M916 286 V262" />
            <path d="M968 286 V250" />
          </g>
        </g>
        <g fill="#ffffff" fillOpacity=".05">
          <circle cx="1024" cy="150" r="86" />
        </g>
      </svg>
    </div>
  );
}

export default function Banner({ photoUrl }) {
  return (
    <div className="banner" id="top">
      <RoadArt />
      {photoUrl ? (
        <div className="banner-photo" style={{ backgroundImage: `url('${photoUrl}')` }} />
      ) : null}
      <div className="banner-veil" aria-hidden="true" />

      <div className="wrap">
        <div className="eyebrow">{site.pickupAreas.join(' \u00B7 ')}</div>
        <h1>
          Our own cars.
          <br />
          <em>Our own drivers.</em>
        </h1>
        <p className="sub">Chauffeur-driven car rental across {site.region}.</p>
        <p className="lede">
          We are not a broker. Every vehicle we send belongs to us and every driver works for us,
          which means the condition of the car, the conduct of the driver and the timing of your
          journey are all our responsibility.
        </p>
        <div className="ctas">
          <a className="btn btn-wa btn-lg" href={wa(QUOTE_MESSAGE)}>
            <WaIcon /> Request a quote
          </a>
          <a className="btn btn-line btn-lg" href={tel()}>Call us now</a>
        </div>
        <div className="callout">
          <span className="k">Bookings</span>
          <a className="v" href={tel()}>{site.displayPhone}</a>
          <span className="h">Available 24 hours, every day</span>
        </div>
        <div className="assure">
          <span><Tick /> Fuel and tolls included</span>
          <span><Tick /> Experienced drivers</span>
          <span><Tick /> Live location sharing</span>
          <span><Tick /> Quoted before you book</span>
        </div>
      </div>
    </div>
  );
}
