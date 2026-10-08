import { about, links } from "@/lib/content";

/* The about block at a calmer size: heading, CDG's two paragraphs and a short facts list on the left, the
   finished living room from CDG's own about section on the right. The figures now live in the hero. */
export function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="about-copy">
          <h2 className="display h-lg" id="about-title" data-reveal="head">{about.title}</h2>
          <div className="about-body">
            {about.body.map((p) => <p key={p.slice(0, 20)} data-reveal="text">{p}</p>)}
          </div>
          <dl className="facts" data-reveal="cards">
            {about.facts.map((f) => (
              <div className="fact" key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
          <a className="link-arrow" href={links.about} data-reveal="label">{about.cta}<Arrow /></a>
        </div>
        <div className="about-media" data-reveal="image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/home-interior.jpg" alt="A finished CDG living room with coffered ceiling and built-in shelving" data-parallax loading="lazy" />
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
