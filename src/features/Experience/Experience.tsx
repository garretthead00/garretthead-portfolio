import { Section } from "../../components/layout/Section";
import { Reveal } from "../../components/motion";
import { profile, roles } from "../../content";
import { RoleCard } from "./RoleCard";

export const Experience = () => (
  <Section id="resume" eyebrow="Experience" title={profile.title}>
    <p className="mt-5 max-w-[760px] text-pretty text-light-gray">
      {profile.experienceSummary}
    </p>
    <ol className="mt-14 flex flex-col gap-5">
      {roles.map((role) => (
        <li key={role.id}>
          <Reveal direction="up" delay={0} amount={0.2}>
            <RoleCard role={role} />
          </Reveal>
        </li>
      ))}
    </ol>
  </Section>
);
