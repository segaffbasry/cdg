import { Logo } from "@/components/Logo";
import { contact, footer, links, nav } from "@/lib/content";

// Storey's closing block on CDG ink: the lock-up large, then address, links and social. No reveals here.
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <a className="footer-logo" href={links.home} aria-label="CDG London, home"><Logo /></a>
          <p>{footer.blurb}</p>
        </div>
        <div className="footer-col">
          <h2>Address</h2>
          <p>{contact.address}</p>
          <p><a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a><br /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        </div>
        <div className="footer-col">
          <h2>Links</h2>
          <ul>{nav.map((n) => <li key={n.label}><a href={n.href}>{n.label}</a></li>)}</ul>
        </div>
        <div className="footer-col">
          <h2>Social networks</h2>
          <ul><li><a href={links.instagram}>Instagram, {contact.social}</a></li></ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>{footer.copyright}</p>
        <ul>{footer.legal.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
