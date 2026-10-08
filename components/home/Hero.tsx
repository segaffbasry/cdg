"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { EASE, onIntro, reducedMotion } from "@/components/Motion";
import { splitWords } from "@/lib/split";
import { about, hero, links } from "@/lib/content";

/* CDG's walkthrough film, full-bleed, as on their live homepage. The headline sits bottom-left (the
   star.regendigital.co hero the client likes); opposite it, CDG's two headline figures sit above the lead
   and the button, so the opening carries the proof as well as the promise. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const words = splitWords(el.querySelector<HTMLElement>(".hero-title")!);
    if (reducedMotion()) return;
    gsap.set(words, { yPercent: 110 });
    gsap.set(el.querySelectorAll(".hero-in"), { y: 20, autoAlpha: 0 });
    return onIntro(() => {
      gsap.fromTo(el.querySelector(".hero-media"), { scale: 1.15 }, { scale: 1.02, duration: 2.4, ease: EASE });
      gsap.to(words, { yPercent: 0, duration: 1.4, ease: EASE, stagger: 0.08, delay: 0.25 });
      gsap.to(el.querySelectorAll(".hero-in"), { y: 0, autoAlpha: 1, duration: 1.1, ease: EASE, stagger: 0.08, delay: 0.55 });
      el.querySelectorAll<HTMLElement>("[data-hero-count]").forEach((n) => {
        const to = Number(n.dataset.heroCount), box = { v: 0 };
        n.textContent = "0";
        gsap.to(box, { v: to, duration: 2, delay: 0.6, ease: "power2.out", onUpdate: () => { n.textContent = String(Math.round(box.v)); } });
      });
    });
  }, []);

  return (
    <section className="hero" ref={root} id="top" aria-label="Introduction">
      <div className="hero-frame">
        <video className="hero-media" muted playsInline loop autoPlay preload="auto" poster="/media/still-living.jpg">
          <source src="/media/walkthrough-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
          <source src="/media/walkthrough.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
      </div>

      <div className="hero-copy wrap">
        <h1 className="hero-title">{hero.title}</h1>
        <div className="hero-side">
          <dl className="hero-stats hero-in">
            {about.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="hero-stat-num"><span data-hero-count={s.value}>{s.value}</span><span className="hero-stat-plus">{s.suffix}</span></span>
                  <span className="hero-stat-label" aria-hidden="true">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="hero-lead hero-in">{hero.lead}</p>
          <a className="btn btn-light hero-in" href={links.contact}>{hero.cta}</a>
        </div>
      </div>
    </section>
  );
}
