"use client";

import { useState } from "react";
import { apart, values } from "@/lib/content";

/* A pale band in Kononenko's register: the five values as a large word list (the one under the pointer, or
   tapped, comes forward and its line appears opposite), then the three reasons CDG gives for choosing it. */
export function Values() {
  const [active, setActive] = useState(0);
  return (
    <section className="values section band" id="values" aria-labelledby="values-title">
      <div className="wrap">
        <div className="values-grid">
          <div>
            <h2 className="kicker-title" id="values-title" data-reveal="label">{values.title}</h2>
            <ul className="values-words">
              {values.items.map((v, i) => (
                <li key={v.title}>
                  <button type="button" className={i === active ? "is-active" : ""} aria-pressed={i === active} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                    {v.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="values-detail" aria-live="polite">
            {values.items.map((v, i) => (
              <p key={v.title} className={`serif-lead${i === active ? " is-active" : ""}`}>{v.text}</p>
            ))}
          </div>
        </div>

        <div className="apart">
          <h2 className="display h-lg" data-reveal="head">{apart.title}</h2>
          <ul className="apart-list" data-reveal="cards">
            {apart.items.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
