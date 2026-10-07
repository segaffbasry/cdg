import { Arrow } from "@/components/home/About";
import { contact, cta, links } from "@/lib/content";

/* The closing invitation from CDG's contact page, over the London skyline (CDG's own image choice), with the
   three ways to reach them set as a plain row beneath. */
export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/london.jpg" alt="" data-parallax loading="lazy" />
      </div>
      <div className="contact-copy wrap">
        <h2 className="display h-xl" id="contact-title" data-reveal="head">{cta.title}</h2>
        <p className="contact-body" data-reveal="text">{cta.body}</p>
        <a className="btn btn-gold" href={links.contact} data-reveal="label">{cta.button}<Arrow /></a>
        <ul className="contact-ways" data-reveal="cards">
          <li><span>Call Us</span><a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a></li>
          <li><span>Email Us</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><span>Visit Us</span><a href={links.contact}>{contact.address}</a></li>
        </ul>
      </div>
    </section>
  );
}
