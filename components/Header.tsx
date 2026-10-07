"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { onIntro } from "@/components/Motion";
import { getLenis } from "@/lib/scroll";
import { contact, links, nav } from "@/lib/content";

/* Kononenko's quiet top line: logo left, plain links right, one solid button (Storey's black Contact pill,
   here in CDG gold). Over the film it is transparent; past the hero it settles on solid ink. It tucks away
   while scrolling down and returns on the way up. On phones the links fold into a full-screen ink menu. */
export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    const off = onIntro(() => el.classList.add("is-in"));
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle("is-solid", y > window.innerHeight * 0.85);
      el.classList.toggle("is-hidden", y > last && y > window.innerHeight * 0.85);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { off(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop(); else lenis?.start();
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className="header" ref={ref}>
      <div className="header-bar wrap">
        <a className="header-logo" href={links.home} aria-label="CDG London, home"><Logo /></a>
        <nav className="header-nav" aria-label="Main">
          {nav.slice(1, 3).map((n) => <a key={n.label} href={n.href}>{n.label}</a>)}
          <a className="btn btn-gold" href={links.contact}>Contact us</a>
        </nav>
        <button className="header-toggle" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="header-toggle-lines" aria-hidden="true" />
        </button>
      </div>
      <div className="menu" id="menu" hidden={!open}>
        <nav className="menu-nav wrap" aria-label="Mobile">
          {nav.map((n) => <a key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        </nav>
        <div className="menu-foot wrap">
          <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </header>
  );
}
