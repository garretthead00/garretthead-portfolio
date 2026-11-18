import { Reveal } from "../../../components/motion";

const introductionSummary = `Senior Software Engineer with 8+ years of experience.
              My career has brought me to many different areas, rarely settling
              down for long. I began building custom applications for Oil & Gas
              and Petrochem facilities until breaking into new areas of the
              field.`;

export const Introduction = () => {
  return (
    <Reveal
      as="article"
      direction="left"
      delay={0.3}
      amount={0.3}
      className="flex-1"
    >
      <h2 className="h2 text-accent">About me</h2>
      <h3 className="h3 mb-4">Senior Software Engineer</h3>
      <p className="mb-6">{introductionSummary}</p>
    </Reveal>
  );
};
