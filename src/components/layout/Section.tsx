import type { ReactNode } from "react";
import type { SectionId } from "../../content";

interface SectionProps {
  id: SectionId;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

/** A labelled page section with the shared eyebrow + title header. */
export const Section = ({ id, eyebrow, title, children }: SectionProps) => {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="border-b border-light-purple/30 last:border-b-0"
    >
      <div className="container-page py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId} className="section-title mt-5">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};
