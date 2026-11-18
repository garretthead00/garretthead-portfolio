import { skills, type TechItem } from "../../../data";
import { Reveal } from "../../../components/motion";

interface SkillsListItemProps {
  tech: TechItem;
}

const SkillsListItem = ({ tech }: SkillsListItemProps) => (
  <li>
    <figure className="items-center justify-center text-center">
      {tech.icon}
      <figcaption className="mt-1 text-sm">{tech.name}</figcaption>
    </figure>
  </li>
);

export const SkillsList = () => (
  <Reveal
    as="article"
    direction="left"
    delay={0.3}
    amount={0.3}
    className="flex flex-col text-center"
  >
    <ul className="mx-auto flex flex-wrap justify-center gap-4">
      {skills.map((tech) => (
        <SkillsListItem key={tech.name} tech={tech} />
      ))}
    </ul>
  </Reveal>
);
