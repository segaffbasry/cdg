"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { splitWords } from "@/lib/split";
import { hero, links } from "@/lib/content";

const DWELL = 6.5; // seconds per chapter

/* Senawa's hero, restaged for CDG: a full-bleed frame that steps through chapters, each named along the
   bottom with one long progress rule. The chapters are CDG's own "What we do?" lines; the first is CDG's
   walkthrough film. Each new frame opens from the right over the last (Senawa's slide), and the headline
   sits bottom-left (the star.regendigital.co hero the client likes). Names can be clicked to jump. */
export function Hero() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const started = useRef(false);
  const prev = useRef(0);

  const run = useCallback((i: number) => {
    tween.current?.kill();
    if (!fill.current) return;
    gsap.set(fill.current, { scaleX: 0 });
    if (reducedMotion()) return;
    tween.current = gsap.to(fill.current, {
      scaleX: 1, duration: DWELL, ease: "none",
      onComplete: () => setActive((i + 1) % hero.slides.length),
    });
  }, []);

  // Each chapter change: open the new frame from the right, settle its scale, restart the rule.
  useEffect(() => {
    const el = root.current!;
    const frames = el.querySelectorAll<HTMLElement>(".hero-frame");
    // The outgoing frame stays underneath while the new one opens over it.
    frames.forEach((f, i) => {
      f.classList.toggle("is-active", i === active);
      f.classList.toggle("is-prev", i === prev.current && i !== active);
    });
    prev.current = active;
    const frame = frames[active];
    const video = frame.querySelector("video");
    if (video) { video.currentTime = 0; video.play().catch(() => {}); }
    if (!reducedMotion() && started.current) {
      gsap.fromTo(frame, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE_IO });
      gsap.fromTo(frame.querySelector(".hero-media"), { scale: 1.12, xPercent: 4 }, { scale: 1.02, xPercent: 0, duration: 1.8, ease: EASE });
    }
    if (started.current) run(active);
  }, [active, run]);

  // The entrance waits for the preloader handover.
  useEffect(() => {
    const el = root.current!;
    const words = splitWords(el.querySelector<HTMLElement>(".hero-title")!);
    if (reducedMotion()) { started.current = true; return; }
    gsap.set(words, { yPercent: 110 });
    gsap.set(el.querySelectorAll(".hero-in"), { y: 20, autoAlpha: 0 });
    return onIntro(() => {
      started.current = true;
      gsap.fromTo(el.querySelector(".hero-frame.is-active .hero-media"), { scale: 1.15 }, { scale: 1.02, duration: 2.4, ease: EASE });
      gsap.to(words, { yPercent: 0, duration: 1.4, ease: EASE, stagger: 0.08, delay: 0.25 });
      gsap.to(el.querySelectorAll(".hero-in"), { y: 0, autoAlpha: 1, duration: 1.1, ease: EASE, stagger: 0.08, delay: 0.6 });
      run(0);
    });
  }, [run]);

  return (
    <section className="hero" ref={root} id="top" aria-label="Introduction">
      <div className="hero-frames">
        {hero.slides.map((s, i) => (
          <div className={`hero-frame${i === 0 ? " is-active" : ""}`} key={s.label} aria-hidden={i !== active}>
            {"media" in s ? (
              <video className="hero-media" muted playsInline loop autoPlay preload="auto" poster="/media/still-living.jpg">
                <source src="/media/walkthrough-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
                <source src="/media/walkthrough.mp4" type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="hero-media" src={s.image} alt="" loading={i < 2 ? "eager" : "lazy"} />
            )}
          </div>
        ))}
        <div className="hero-shade" />
      </div>

      <div className="hero-copy wrap">
        <h1 className="hero-title">{hero.title}</h1>
        <div className="hero-side">
          <p className="hero-lead hero-in">{hero.lead}</p>
          <a className="btn btn-light hero-in" href={links.contact}>{hero.cta}</a>
        </div>
      </div>

      <div className="hero-chapters wrap hero-in">
        <ol className="hero-names">
          {hero.slides.map((s, i) => (
            <li key={s.label}>
              <button type="button" className={i === active ? "is-active" : ""} aria-current={i === active} onClick={() => setActive(i)}>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
        <span className="hero-rule" aria-hidden="true">
          <span className="hero-rule-fill" ref={fill} style={{ left: `${(active / hero.slides.length) * 100}%`, width: `${100 / hero.slides.length}%` }} />
        </span>
      </div>
    </section>
  );
}
