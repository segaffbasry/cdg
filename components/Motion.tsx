"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

gsap.registerPlugin(ScrollTrigger);

/* Easing, from the references: Storey and Senawa both run long, soft expo-style outs on their image and
   type reveals; Kononenko's statement lines rise slowly out of a mask. One curve family covers all three. */
export const EASE = "expo.out";
export const EASE_IO = "power3.inOut";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Handover from the preloader: the hero entrance, the header and scrolling wait for this.
export const INTRO_DONE = "intro:done";
export const introDone = () => document.documentElement.dataset.intro === "done";
export function onIntro(fn: () => void) {
  if (introDone()) { fn(); return () => {}; }
  window.addEventListener(INTRO_DONE, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE, fn);
}

/* Page-wide behaviour:
   - the link guard: a private demo, so links keep their real hrefs but never leave the page; "#" links scroll
     through Lenis instead
   - Lenis on the GSAP ticker, synced with ScrollTrigger, stopped while the preloader plays
   - the reveal vocabulary, declared in markup with data-reveal:
       head   a heading: its words rise out of a mask (Kononenko's statement lines)
       text   a paragraph: a soft fade and rise
       label  small lines and buttons: a short fade and rise
       cards  a list: its children reveal in batches as they arrive
       image  a frame that opens upward like a curtain (Storey's image reveal); an <img data-parallax> drifts
       count  a figure counts up from zero
     The footer has no reveals (playbook: they fire in the last pixels and read as a jump). */
export function Motion() {
  useEffect(() => {
    const guard = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      e.preventDefault();
      if (!href.startsWith("#")) return;
      const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getLenis();
      if (lenis) { lenis.start(); lenis.scrollTo(target as HTMLElement | number, { duration: 1.3 }); }
      else if (typeof target === "number") window.scrollTo({ top: 0 });
      else target.scrollIntoView();
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    const unguard = () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };

    if (reducedMotion()) return unguard;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const ctx = gsap.context(() => {
      const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="head"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: EASE, stagger: 0.04, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
        gsap.fromTo(el, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, ease: EASE, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="label"]').forEach((el) => {
        gsap.fromTo(el, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, scrollTrigger: once(el, "top 94%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(list, { autoAlpha: 1 });
        gsap.set(items, { y: 32, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 92%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, ease: EASE, stagger: 0.08 }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE_IO, scrollTrigger: once(el, "top 86%"),
          onComplete: () => { el.style.clipPath = "none"; },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, {
          yPercent: 6, scale: 1.14, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const box = { v: 0 };
        el.textContent = "0";
        gsap.to(box, { v: to, duration: 2, ease: "power2.out", scrollTrigger: once(el), onUpdate: () => { el.textContent = String(Math.round(box.v)); } });
      });
    });
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      unguard();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
