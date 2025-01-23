import { useInView } from "react-intersection-observer";
import { Introduction, SkillsList, ExperienceList } from "./components";

export const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <section
      id="about"
      className="container flex flex-col lg:flex-row gap-8 h-svh mx-auto p-4 justify-center items-center lg:gap-x-20 lg:gap-y-0"
      ref={ref}
    >
      <div className="flex flex-col mb-4">
        <Introduction />
        <ExperienceList inView={inView} />
      </div>
      <SkillsList />
    </section>
  );
};
