/* Every line of copy on the page, taken from cdg.london (home, about-us, services, contact-us) as published on
   7 Oct 2026. Kept verbatim apart from two dashes, rewritten as commas (playbook: no em or en dashes). */

const SITE = "https://cdg.london";

export const links = {
  home: `${SITE}/`,
  about: `${SITE}/about-us`,
  services: `${SITE}/services`,
  contact: `${SITE}/contact-us`,
  terms: `${SITE}/terms-conditions`,
  privacy: `${SITE}/privacy-policy`,
  instagram: "https://www.instagram.com/cdgconstruction.london?igsh=Mjl6a3c4bncyOTI3",
};

export const nav = [
  { label: "Home", href: links.home },
  { label: "About us", href: links.about },
  { label: "Services", href: links.services },
  { label: "Contact us", href: links.contact },
];

export const contact = {
  address: "Virginia House, Unit 1, 35-51 Station Road, Egham, Surrey, TW20 9LB",
  phone: "+447565496266",
  phoneDisplay: "+44 7565 496266",
  email: "info@cdg.london",
  social: "CDG London",
};

export const hero = {
  title: "Build your dreams",
  lead: "Bespoke luxury construction for those who demand the exceptional",
  cta: "Contact Us",
};

export const about = {
  title: "Excellence in Construction Since 1996",
  body: [
    "For over three decades, we've been delivering exceptional construction solutions for high-end projects and discerning clients. Specialising in large-scale builds, we provide comprehensive services from initial design through to final completion, ensuring excellence at every stage.",
    "Our reputation is built on unwavering commitment to quality, precision engineering, and meticulous attention to detail. From luxury residential developments to complex commercial builds, we bring unparalleled expertise and professionalism to every project we undertake.",
  ],
  facts: [
    { k: "Founded", v: "1996" },
    { k: "Based", v: "Egham, Surrey" },
    { k: "Working", v: "Exclusively within the M25" },
    { k: "Sectors", v: "Premium residential and commercial" },
  ],
  stats: [
    { value: 30, suffix: "+", label: "Years experience" },
    { value: 750, suffix: "+", label: "Projects completed" },
  ],
  cta: "Learn More",
};

export const mission = {
  title: "Our Mission",
  body: "To help people bring their dream homes to life. Creating spaces that are not only architecturally beautiful, but also deeply personal, warm, and lasting. Our purpose is to build homes that truly feel like home, crafted with care.",
};

export const services = {
  title: "Construction & Design Excellence",
  intro: "CDG is a leading construction and design company delivering projects of all scales, from intimate bespoke builds to large-scale commercial developments. We proudly serve high-profile clients and create unique, custom solutions that stand the test of time.",
  items: [
    { title: "Building & Construction", image: "/media/build.jpg", text: "CDG handles all stages of building, from foundations to final touches, ensuring quality and durability. Our team works closely with clients to deliver structures that meet high standards and bring their vision to life." },
    { title: "Design & Planning", image: "/media/design.jpg", text: "CDG's design and planning team creates spaces that are both functional and visually appealing. We work with clients to develop ideas into efficient, practical designs that suit their style and needs." },
    { title: "Interior Finishing", image: "/media/still-kitchen.jpg", text: "Our interior finishing services cover everything from floors to lighting, adding polish to every room. CDG.london uses quality materials and detailed craftsmanship to create spaces that are stylish and functional." },
    { title: "Renovations & Repairs", image: "/media/still-stairs.jpg", text: "CDG revitalizes properties with thoughtful renovations and repairs. From small updates to major upgrades, we enhance the value, look, and functionality of every space." },
    { title: "Commercial", image: "/media/commercial.jpg", text: "Tailored commercial spaces, end to end" },
  ],
  cta: "Our services",
};

export const commitment = {
  title: "Building the Future, Today",
  body: "At CDG, we specialize in delivering construction excellence across the full spectrum of project sizes. Whether you're looking for a small, carefully crafted build or a large-scale commercial development, our team brings the same level of dedication, precision, and quality to every project.",
};

export const values = {
  title: "Our Values",
  items: [
    { title: "Excellence", text: "To help people bring their dream homes to life. Our purpose is to build homes that truly feel like home, crafted with care." },
    { title: "Integrity", text: "Transparency, accountability, and clear communication guide everything we do." },
    { title: "Craftsmanship", text: "We collaborate with expert trades and use only premium materials to ensure long-lasting quality." },
    { title: "Innovation", text: "We apply modern building technologies and sustainable practices to enhance efficiency and performance." },
    { title: "Trust", text: "Clients choose us for our reliability, consistency, and proven track record of delivering complex luxury projects on time." },
  ],
};

export const apart = {
  title: "What Sets Us Apart",
  items: [
    { title: "Over 30 Years of Expertise and Craftsmanship", text: "With three decades of experience in the industry, we combine skilled craftsmanship with a deep understanding of London's architectural heritage. We bring precision and quality to every project, ensuring results that exceed expectations." },
    { title: "Unwavering Commitment to Safety", text: "Safety is paramount in everything we do. We follow rigorous safety protocols, conduct regular risk assessments, and ensure every project site exceeds industry safety standards, providing complete peace of mind for our clients and team." },
    { title: "Client-Centred Excellence", text: "We believe in open communication and complete transparency. Working closely with each client from concept to completion, we ensure every stakeholder is informed and involved, delivering a seamless and satisfying experience throughout." },
  ],
};

// The three named, attributed reviews on the homepage carousel.
export const testimonials = {
  title: "See What Our Clients Say",
  items: [
    { author: "Stephen Robinson", role: "Director, Smart Build Homes Ltd", text: "I first met CDG during the tender process for our Egham development. From the outset, I was genuinely impressed by CDG’s professionalism, attention to detail, and clear communication. What sets them apart is the strong partnership between Peter, who runs the site, and Phil, who handles the contract side with clarity and efficiency. The Egham project was delivered on time and on budget, despite a few curveballs. I was so impressed with their approach and the end result that I’ve already contracted them on my next major development. CDG now forms part of my trusted team, and I would confidently recommend them to others looking for a reliable, professional, and solutions-driven contractor." },
    { author: "Jon-Paul Elwart", role: "Snr. Building Surveyor & Project Manager", text: "Working with CDG Construction was an excellent experience from start to finish. The team was personable, professional, and highly organized, coordinating every stage of the project with care and precision. They delivered outstanding quality while staying within budget and going the extra mile to meet tight deadlines. CDG Construction demonstrated good problem-solving skills and a genuine commitment to the success of the project, always giving 100%. Their proactive communication and attention to detail made the process smooth and almost stress-free! I would highly recommend CDG Construction to anyone looking for a reliable, skilled, and dedicated contractor. A safe pair of hands." },
    { author: "David Drew", role: "Project Manager", text: "I had the pleasure of working with CDG on a 20-unit residential conversion in Egham, Surrey. Their exceptional professionalism and solutions-oriented approach made the entire delivery process efficient and enjoyable. The quality of workmanship was outstanding, with careful attention to detail and finish. Most impressively, CDG completed the scheme on time while maintaining clear communication throughout. A reliable, transparent, and thoroughly professional contractor who delivers quality and value in equal measure." },
  ],
};

export const cta = {
  title: "Let's Build Something Extraordinary",
  body: "Whether you're planning a luxury residential project or a commercial development, our team is ready to bring your vision to life with precision and excellence.",
  button: "Contact Us Today",
};

export const footer = {
  blurb: "CDG Construction is a trusted construction company with over 30 years of experience, delivering quality craftsmanship across London.",
  legal: [
    { label: "Terms & Conditions", href: links.terms },
    { label: "Privacy Policy", href: links.privacy },
  ],
  copyright: "Copyright © 2026 CDG London",
};
