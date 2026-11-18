import { SiteFooter } from "./components/layout/SiteFooter";
import { MobileNav } from "./components/navigation/MobileNav";
import { SiteHeader } from "./components/navigation/SiteHeader";
import { sections } from "./content";
import { About } from "./features/About/About";
import { Experience } from "./features/Experience/Experience";
import { Hero } from "./features/Hero/Hero";
import { useActiveSection } from "./hooks/useActiveSection";

const sectionIds = sections.map((section) => section.id);

const App = () => {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-30 rounded-full bg-lsu-gold px-4 py-2 font-semibold text-corporate-purple focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader activeId={activeId} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
      </main>
      <SiteFooter />
      <MobileNav activeId={activeId} />
    </>
  );
};

export default App;
