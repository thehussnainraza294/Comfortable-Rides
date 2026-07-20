import { site, wa, tel } from '../lib/config';

export function WaIcon() {
  return (
    <svg className="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.3 5.3 0 0 0 3.3.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.2z" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function Tick() {
  return (
    <svg className="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="topbar">
      <div className="wrap">
        <a className="brand" href="#top">
          <span className="mark">{site.initials}</span>
          <span>
            <b>{site.name}</b>
            <i>{site.tagline}</i>
          </span>
        </a>
        <div className="acts">
          <a className="btn btn-line" href={tel()}>
            <PhoneIcon /> {site.displayPhone}
          </a>
          <a className="btn btn-wa" href={wa()}>
            <WaIcon /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="col">
            <h4>{site.name}</h4>
            <p>Chauffeur-driven car rental</p>
            <p>{site.city}, {site.region}</p>
            <p>Open 24 hours, every day</p>
          </div>
          <div className="col">
            <h4>Services</h4>
            <a href="#services">Intercity journeys</a>
            <a href="#services">Airport transfers</a>
            <a href="#services">Weddings and events</a>
            <a href="#services">Full day hire</a>
          </div>
          <div className="col">
            <h4>Destinations</h4>
            <a href="#destinations">Islamabad</a>
            <a href="#destinations">Lahore</a>
            <a href="#destinations">Faisalabad</a>
            <a href="#destinations">Multan</a>
          </div>
          <div className="col">
            <h4>Contact</h4>
            <a href={tel()}>{site.displayPhone}</a>
            <a href={wa()}>WhatsApp</a>
          </div>
        </div>
        <div className="legal">
          <span>
            &copy; {new Date().getFullYear()} {site.name}. Chauffeur-driven car rental from {site.city} across {site.region}.
          </span>
          <a href="/admin/" style={{ color: 'inherit', opacity: 0.55, fontSize: 13 }}>Admin</a>
        </div>
      </div>
    </footer>
  );
}

export function StickyBar() {
  return (
    <nav className="stick">
      <a className="btn btn-line" href={tel()}>Call</a>
      <a className="btn btn-wa" href={wa()}>WhatsApp</a>
    </nav>
  );
}
