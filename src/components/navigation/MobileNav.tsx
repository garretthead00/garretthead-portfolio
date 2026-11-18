import { sections, type SectionId } from "../../content";
import { Icon } from "../Icon";

interface MobileNavProps {
  activeId: SectionId;
}

/** Labelled bottom tab bar for small screens, clear of the iOS home indicator. */
export const MobileNav = ({ activeId }: MobileNavProps) => (
  <nav
    aria-label="Sections"
    className="fixed inset-x-0 bottom-0 z-20 border-t border-light-purple/30 bg-lsu-purple px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] contrast-more:border-light-purple md:hidden"
  >
    <ul className="grid grid-cols-3">
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={
                isActive
                  ? "flex min-h-13 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-lsu-gold underline decoration-2 underline-offset-4"
                  : "flex min-h-13 flex-col items-center justify-center gap-0.5 text-xs font-medium text-light-gray hover:text-lsu-gold"
              }
            >
              <Icon name={section.id} />
              {section.label}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);
