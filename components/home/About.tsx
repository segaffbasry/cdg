import { about, links } from "@/lib/content";

/* Kononenko's opening statement: one large centred line, then a quiet facts table beside a long serif
   paragraph, then two figures set large. All CDG's own words and numbers. */
export function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <h2 className="about-title display" id="about-title" data-reveal="head">{about.title}</h2>

        <div className="about-grid">
          <dl className="facts" data-reveal="cards">
            {about.facts.map((f) => (
              <div className="fact" key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
          <div className="about-body">
            {about.body.map((p) => <p className="serif-lead" key={p.slice(0, 20)} data-reveal="text">{p}</p>)}
          </div>
        </div>

        <div className="about-stats">
          {about.stats.map((s) => (
            <div className="stat" key={s.label}>
              <p className="stat-num"><span data-count={s.value}>{s.value}</span><span className="stat-plus">{s.suffix}</span></p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
          <a className="link-arrow" href={links.about} data-reveal="label">{about.cta}<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  );
}
