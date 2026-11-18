import { Section } from "../../components/layout/Section";
import { Reveal, motionRules } from "../../components/motion";
import { TechLabels } from "../../components/TechLabels";
import { profile, skillGroups } from "../../content";

export const About = () => (
  <Section id="about" eyebrow="About" title={profile.about.heading}>
    <div className="mt-6 grid items-start gap-14 lg:grid-cols-2">
      <Reveal amount={0.3}>
        <div className="flex flex-col gap-6 text-pretty text-light-gray">
          {profile.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
      <Reveal delay={motionRules.stagger}>
        <ul aria-label="Skills" className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <li key={group.id} className="card flex flex-col gap-3.5 p-6">
              <h3 className="text-base font-semibold">{group.name}</h3>
              <TechLabels items={group.skills} label={group.name} />
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </Section>
);
