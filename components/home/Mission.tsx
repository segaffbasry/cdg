import { Arrow } from "@/components/home/About";
import { links, mission } from "@/lib/content";

/* Storey's "We shape space into purpose": a full-bleed photograph with one centred statement over it.
   Here it carries CDG's mission over a warm finished interior, shaded enough to read. */
export function Mission() {
  const [lead, ...rest] = mission.body.split(". ");
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="mission-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/interior.jpg" alt="" data-parallax loading="lazy" />
      </div>
      <div className="mission-copy wrap">
        <h2 className="sr-only" id="mission-title">{mission.title}</h2>
        <p className="mission-lead display" data-reveal="head">{lead}.</p>
        <p className="mission-rest" data-reveal="text">{rest.join(". ")}</p>
        <a className="btn btn-light" href={links.about} data-reveal="label">{mission.title}<Arrow /></a>
      </div>
    </section>
  );
}
