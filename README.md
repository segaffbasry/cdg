# CDG London, homepage demo

Private Regen prospect demo of [cdg.london](https://cdg.london/). Single route, Next.js 16 + GSAP + Lenis.

- **References:** senawastudio.com (chaptered hero with progress rule), kononenkogroup.com (centred statement, facts table, large figures, serif body), storeyarchitecture.co.uk (split headings, expertise list, full-bleed statement image, quote block, footer).
- **Brand kept:** the real CDG London vector lock-up (from the live site's `image.svg`), Libre Baskerville, ink `#161616`, goldenrod `#DAA520`, white. Inter Tight replaces MUI's default Roboto for UI text.
- **Content:** all copy is CDG's own, from home, about-us, services and contact-us (`lib/content.ts`). The hero film is CDG's walkthrough; other images are CDG's own homepage image and the stock images CDG already uses.
- **Signature visual:** an interactive London-within-the-M25 diagram built from CDG's "every corner of London, exclusively within the M25" claim.
- **Playbook:** noindex/nofollow, PostHog EU (`lib/posthog.ts`), scroll-depth events, links keep real hrefs but never navigate, preloader on every load (~2.6s), no em/en dashes, no scroll recolouring, no pins.

```bash
npm run dev     # http://127.0.0.1:3047
npm run build && npm start
node scripts/shots.mjs 1440 _shots   # full-page screenshots
```
