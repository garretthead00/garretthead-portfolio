import { useInView } from "react-intersection-observer";
import { Introduction, SkillsList, ExperienceList } from "./components";

export const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <section
      id="about"
      className="container mx-auto flex h-svh flex-col items-center justify-center gap-8 p-4 lg:flex-row lg:gap-x-20 lg:gap-y-0"
      ref={ref}
    >
      <div className="mb-4 flex flex-col">
        <Introduction />
        <ExperienceList inView={inView} />
      </div>
      <SkillsList />
    </section>
  );
};
