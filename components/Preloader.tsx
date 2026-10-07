"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, INTRO_DONE, reducedMotion } from "@/components/Motion";
import { getLenis } from "@/lib/scroll";

/* The lock-up assembling itself, about 2.5s on every load (playbook: loaders must be noticed):
     0.00 to 1.90  a counter runs 000 to 100 and a gold rule fills beneath it
     0.10 to 1.10  the columns and the CDG monogram rise into place, piece by piece
     0.90 to 1.40  LONDON rises letter by letter
     1.40 to 1.95  hold, then the gold "Since 1996" line
     1.95 to 2.60  exit: the lock-up flies to the header logo while the ink curtain lifts off the hero film
   Skipped with reduced motion, hidden without JavaScript, finished by a failsafe after 3.2s. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.dataset.intro = "done";
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      html.classList.add("logo-landed");
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const mark = el.querySelector<HTMLElement>(".preloader-mark")!;
    const q = (s: string) => Array.from(el.querySelectorAll<SVGElement>(`[data-part="${s}"]`));
    const count = el.querySelector<HTMLElement>(".preloader-count")!;
    const target = document.querySelector<HTMLElement>(".header-logo .logo");
    const flight = () => {
      if (!target) return { x: 0, y: -40, scale: 0.3 };
      const a = mark.getBoundingClientRect(), b = target.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };

    gsap.set(q("mark"), { y: 40, opacity: 0, transformOrigin: "50% 100%" });
    gsap.set(q("letter"), { y: 30, opacity: 0 });
    const counter = { v: 0 };

    const tl = gsap.timeline({ onComplete: () => { el.style.display = "none"; html.classList.add("logo-landed"); } });
    tl.add(() => el.classList.add("is-active"), 0)
      .to(counter, { v: 100, duration: 1.9, ease: "power2.inOut", onUpdate: () => { count.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0)
      .to(el.querySelector(".preloader-fill"), { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
      .to(q("mark"), { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.06 }, 0.1)
      .to(q("letter"), { y: 0, opacity: 1, duration: 0.7, ease: EASE, stagger: 0.07 }, 0.9)
      .fromTo(el.querySelector(".preloader-since"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: EASE }, 1.35)
      .add(handover, 1.95)
      .to(el.querySelectorAll(".preloader-meta, .preloader-since"), { opacity: 0, duration: 0.3, ease: "none" }, 1.95)
      .to(mark, { x: () => flight().x, y: () => flight().y, scale: () => flight().scale, duration: 0.65, ease: EASE_IO }, 1.95)
      .to(el.querySelector(".preloader-curtain"), { clipPath: "inset(0% 0% 100% 0%)", duration: 0.65, ease: EASE_IO }, 1.97);

    const failsafe = window.setTimeout(() => { tl.progress(1); }, 3200);
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-curtain">
        <p className="preloader-since">Since 1996</p>
        <div className="preloader-meta wrap">
          <span className="preloader-count">000</span>
          <span className="preloader-bar"><span className="preloader-fill" /></span>
        </div>
      </div>
      <div className="preloader-mark"><Logo title="" parts /></div>
    </div>
  );
}
