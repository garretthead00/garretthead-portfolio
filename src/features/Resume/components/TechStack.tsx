import React from "react";
import type { TechItem } from "../../../data";

interface TechStackListItemProps {
  tech: TechItem;
  index: number;
}

const TechStackListItem = ({ tech, index }: TechStackListItemProps) => (
  <li key={index + "_techStackItem"}>
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
    {stack &&
      stack.map((tech, idx) => <TechStackListItem index={idx} tech={tech} />)}
  </ul>
);
