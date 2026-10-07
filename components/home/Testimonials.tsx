"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, reducedMotion } from "@/components/Motion";
import { testimonials } from "@/lib/content";

const DWELL = 11;

/* Storey's client-quote block: one quote at a time, large and calm, its author named in a row of tabs that
   each carry a thin progress rule (the same rule as the hero). Advances on its own while on screen; any
   name can be chosen. */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = root.current!;
    const quote = el.querySelector(".quote.is-active");
    if (!reducedMotion()) gsap.fromTo(quote, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: EASE });
    const fills = el.querySelectorAll<HTMLElement>(".quote-fill");
    tween.current?.kill();
    gsap.set(fills, { scaleX: 0 });
    if (reducedMotion()) return;
    tween.current = gsap.to(fills[active], {
      scaleX: 1, duration: DWELL, ease: "none", paused: !visible.current,
      onComplete: () => setActive((active + 1) % testimonials.items.length),
    });
  }, [active]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (e.isIntersecting) tween.current?.play(); else tween.current?.pause();
    }, { threshold: 0.4 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section className="testimonials section band" ref={root} aria-labelledby="testimonials-title">
      <div className="wrap">
        <h2 className="kicker-title" id="testimonials-title" data-reveal="label">{testimonials.title}</h2>
        <div className="quotes">
          {testimonials.items.map((t, i) => (
            <figure key={t.author} className={`quote${i === active ? " is-active" : ""}`} aria-hidden={i !== active}>
              <blockquote><p>{t.text}</p></blockquote>
              <figcaption><strong>{t.author}</strong><span>{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
        <ol className="quote-tabs">
          {testimonials.items.map((t, i) => (
            <li key={t.author}>
              <button type="button" className={i === active ? "is-active" : ""} aria-current={i === active} onClick={() => setActive(i)}>
                <span className="quote-rule"><span className="quote-fill" /></span>
                <span className="quote-name">{t.author}</span>
                <span className="quote-role">{t.role}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
