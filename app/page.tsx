import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { London } from "@/components/home/London";
import { Mission } from "@/components/home/Mission";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { Values } from "@/components/home/Values";

/* The single route: CDG's homepage, with the stronger material from About us and Services brought onto it. */
export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Mission />
        <Services />
        <Values />
        <London />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
