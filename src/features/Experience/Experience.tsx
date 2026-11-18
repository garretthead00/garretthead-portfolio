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
        <Reveal as="li" key={role.id}>
          <RoleCard role={role} />
        </Reveal>
      ))}
    </ol>
  </Section>
);
