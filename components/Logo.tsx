import { LOGO_MARK, LOGO_VIEWBOX, LOGO_WORD } from "@/lib/logo";

/* The CDG London lock-up: two columns framing the CDG monogram, LONDON beneath. Drawn in currentColor.
   With `parts`, each shape carries data-part ("mark" or "letter") so the preloader can assemble it. */
export function Logo({ title = "CDG London", parts = false }: { title?: string; parts?: boolean }) {
  return (
    <svg className="logo" viewBox={LOGO_VIEWBOX} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title || undefined} fill="currentColor">
      {LOGO_MARK.map((d, i) => <path key={`m${i}`} d={d} data-part={parts ? "mark" : undefined} />)}
      {LOGO_WORD.map((d, i) => <path key={`w${i}`} d={d} data-part={parts ? "letter" : undefined} />)}
    </svg>
  );
}
