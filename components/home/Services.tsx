"use client";

import { useState } from "react";
import { Arrow } from "@/components/home/About";
import { links, services } from "@/lib/content";

/* Storey's "Our areas of expertise": a big two-line heading with a short paragraph opposite, then a ruled
   list of disciplines. Storey pins a picture to each row; here one tall frame beside the list follows the row
   under the pointer (or the tapped one), so the list stays compact. On phones each row shows its own picture. */
export function Services() {
  const [active, setActive] = useState(0);
  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="split-head">
          <h2 className="display h-xl" id="services-title" data-reveal="head">{services.title}</h2>
          <p className="split-intro" data-reveal="text">{services.intro}</p>
        </div>

        <div className="services-grid">
          <div className="services-frame" data-reveal="image">
            {services.items.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.title} src={s.image} alt="" className={i === active ? "is-active" : ""} loading="lazy" />
            ))}
            <p className="services-caption">{services.items[active].title}</p>
          </div>

          <ul className="services-list">
            {services.items.map((s, i) => (
              <li key={s.title} className={`service${i === active ? " is-active" : ""}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                <div className="service-thumb" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt="" loading="lazy" />
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-text">{s.text}</p>
                <a className="service-link" href={links.services} aria-label={`${s.title}, read more`}><Arrow /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
