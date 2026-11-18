import { education } from "../../../data";
import { Reveal } from "../../../components/motion";

export const JobTitle = () => (
  <Reveal
    as="article"
    direction="right"
    delay={0.3}
    amount={0.3}
    className="mb-4 flex-1 bg-no-repeat mix-blend-lighten lg:bg-bottom"
  >
    <div className="flex flex-col items-center justify-center">
      <h2 className="h2 mb-6 text-accent">Experience</h2>
      <h3 className="h3 max-w-[455px] lg:mb-16">Senior Software Engineer</h3>
    </div>

    <div className="hidden items-center lg:flex lg:flex-col">
      <img src={education.icon} alt="" className="w-[200px]" />
      <h4 className="mb-2 font-primary font-semibold tracking-wider">
        {education.degree} in {education.concentration}
      </h4>
    </div>
  </Reveal>
);
