"use client";

import { useState } from "react";
import { london } from "@/lib/content";

/* The signature visual, built from CDG's own claim: "every corner of London", "exclusively within the M25".
   A diagram, not a map: the M25 as a ring, the Thames through it, five districts that answer the pointer (or a
   tap) by lighting up in gold and bringing their line forward in the copy beside. The office at Egham sits
   on the ring's western edge. */
const C = 300, R = 262, CORE = 78;
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)].map((n) => +n.toFixed(2));
};
const sector = (from: number, to: number) => {
  const [a, b] = [pt(from, CORE), pt(from, R)];
  const [c, d] = [pt(to, R), pt(to, CORE)];
  return `M${a} L${b} A${R} ${R} 0 0 1 ${c} L${d} A${CORE} ${CORE} 0 0 0 ${a}Z`;
};
const zones: Record<string, { d: string; label: [number, number] }> = {
  north: { d: sector(-45, 45), label: pt(0, 172) as [number, number] },
  east: { d: sector(45, 135), label: pt(90, 172) as [number, number] },
  south: { d: sector(135, 225), label: pt(180, 172) as [number, number] },
  west: { d: sector(225, 315), label: pt(270, 172) as [number, number] },
  central: { d: `M${C - CORE} ${C}a${CORE} ${CORE} 0 1 0 ${CORE * 2} 0a${CORE} ${CORE} 0 1 0 ${-CORE * 2} 0Z`, label: [C, C] },
};
const egham = pt(256, R);

export function London() {
  const [active, setActive] = useState("central");
  const area = london.areas.find((a) => a.id === active)!;

  return (
    <section className="london section" id="london" aria-labelledby="london-title">
      <div className="wrap london-grid">
        <div className="london-copy">
          <h2 className="display h-lg" id="london-title" data-reveal="head">{london.title}</h2>
          <p className="split-intro" data-reveal="text">{london.intro}</p>

          <ul className="london-areas" data-reveal="cards">
            {london.areas.map((a) => (
              <li key={a.id}>
                <button type="button" className={a.id === active ? "is-active" : ""} aria-pressed={a.id === active} onMouseEnter={() => setActive(a.id)} onFocus={() => setActive(a.id)} onClick={() => setActive(a.id)}>
                  {a.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="london-line" aria-live="polite" key={area.id}>{area.text}</p>
          <p className="london-note">{london.note}</p>
        </div>

        <figure className="london-map" data-reveal="text">
          <svg viewBox="0 0 600 600" role="img" aria-label="Diagram of London inside the M25, divided into Central, North, East, South and West">
            <defs>
              <clipPath id="ring"><circle cx={C} cy={C} r={R} /></clipPath>
            </defs>
            {Object.entries(zones).map(([id, z]) => (
              <path key={id} d={z.d} className={`zone${id === active ? " is-active" : ""}`} onMouseEnter={() => setActive(id)} onClick={() => setActive(id)} />
            ))}
            <path className="thames" clipPath="url(#ring)" d="M20 352 C 110 330, 150 392, 230 360 S 300 300, 340 330 S 420 392, 470 340 S 560 300, 590 318" />
            <circle className="m25" cx={C} cy={C} r={R} />
            <text className="m25-label" x={C} y={C - R - 12} textAnchor="middle">M25</text>
            {Object.entries(zones).map(([id, z]) => (
              <text key={id} x={z.label[0]} y={z.label[1] + 5} textAnchor="middle" className={`zone-label${id === active ? " is-active" : ""}`}>
                {london.areas.find((a) => a.id === id)!.name.replace(" London", "")}
              </text>
            ))}
            <g className="pin" transform={`translate(${egham[0]} ${egham[1]})`}>
              <circle r="7" />
              <circle r="15" className="pin-pulse" />
              <text x="-16" y="30" textAnchor="middle">CDG, Egham</text>
            </g>
          </svg>
        </figure>
      </div>
    </section>
  );
}
