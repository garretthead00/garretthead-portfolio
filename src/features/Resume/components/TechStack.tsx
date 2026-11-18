import type { TechItem } from "../../../data";

interface TechStackListItemProps {
  tech: TechItem;
}

const TechStackListItem = ({ tech }: TechStackListItemProps) => (
  <li>
    <figure className="items-center justify-center text-center">
      {tech.icon}
      <figcaption className="mt-1 text-sm">{tech.name}</figcaption>
    </figure>
  </li>
);

interface TechStackListProps {
  stack: TechItem[];
}

export const TechStackList = ({ stack }: TechStackListProps) => (
  <ul className="flex flex-wrap justify-center gap-4 md:justify-start">
    {stack.map((tech) => (
      <TechStackListItem key={tech.name} tech={tech} />
    ))}
  </ul>
);
