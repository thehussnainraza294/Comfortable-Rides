// Renders nothing at all until the admin adds a vehicle, so the site
// never shows an empty section or a placeholder car.

export default function Fleet({ vehicles }) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section id="fleet">
      <div className="wrap">
        <div className="cap">Fleet</div>
        <h2>The vehicles we operate</h2>
        <p className="sectionsub">
          Each vehicle is maintained by us and driven by a driver we know personally. Tell us the
          journey and we will recommend the right one.
        </p>
        <div className="fleet">
          {vehicles.map((v) => {
            const rows = [
              v.seats ? ['Passengers', v.seats] : null,
              v.luggage ? ['Luggage', v.luggage] : null,
              ['Air conditioning', 'Yes'],
              v.best_for ? ['Best for', v.best_for] : null,
            ].filter(Boolean);

            return (
              <article className="veh" key={v.id}>
                {v.photo_url ? (
                  <div className="photo" style={{ backgroundImage: `url('${v.photo_url}')` }} />
                ) : null}
                <div className="inner">
                  <div className="cls">{v.class || 'Vehicle'}</div>
                  <h3>{v.name}</h3>
                  {v.description ? <p>{v.description}</p> : null}
                  <div className="spec">
                    {rows.map(([k, val]) => (
                      <div className="r" key={k}>
                        <span>{k}</span>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
