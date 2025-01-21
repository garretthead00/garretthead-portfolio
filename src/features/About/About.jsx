import { useInView } from "react-intersection-observer";
import { Introduction, SkillsList, ExperienceList } from "./components";

export const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <section
      id="about"
      className="section container mx-auto flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-20 lg:gap-y-0"
      ref={ref}
    >
      <Introduction />
      <ExperienceList inView={inView} />
      <SkillsList />
    </section>
  );
};

