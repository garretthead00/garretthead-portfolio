import tigerMark from "../../assets/images/TigerLogo.png?w=36;72;108&format=avif;webp&as=picture";
import { profile, sections, type SectionId } from "../../content";
import { Picture } from "../Picture";
import { SocialLinks } from "../SocialLinks";

interface SiteHeaderProps {
  activeId: SectionId;
}

/** Sticky top bar: name, section links (from md up) and social links. */
export const SiteHeader = ({ activeId }: SiteHeaderProps) => (
  <header className="sticky top-0 z-20 h-(--header-height) border-b border-light-purple/30 bg-corporate-purple contrast-more:border-light-purple">
    <div className="container-page flex h-full items-center justify-between gap-4">
      <a
        href="#home"
        className="flex items-center gap-3 text-white hover:text-white"
      >
        <Picture
          picture={tigerMark}
          sizes="36px"
          alt=""
          className="size-9 object-contain"
        />
        <span className="font-display text-sm font-bold tracking-[0.06em] uppercase sm:text-base">
          {profile.name}
        </span>
      </a>

      <nav aria-label="Sections" className="hidden md:block">
        <ul className="flex items-center gap-1">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={
                    isActive
                      ? "flex min-h-11 items-center rounded-full bg-lsu-purple px-4 text-[15px] font-semibold text-lsu-gold underline decoration-2 underline-offset-4"
                      : "flex min-h-11 items-center rounded-full px-4 text-[15px] font-medium text-light-gray hover:text-lsu-gold"
                  }
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <SocialLinks />
    </div>
  </header>
);
