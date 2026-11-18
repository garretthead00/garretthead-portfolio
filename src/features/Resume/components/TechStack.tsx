import React from "react";
import type { TechItem } from "../../../data";

interface TechStackListItemProps {
  tech: TechItem;
  index: number;
}

const TechStackListItem = ({ tech, index }: TechStackListItemProps) => (
  <li key={index + "_techStackItem"}>
    <figure className="text-center items-center justify-center">
      {tech.icon}
      <figcaption className="text-sm mt-1">{tech.name}</figcaption>
    </figure>
  </li>
);

interface TechStackListProps {
  stack: TechItem[];
}

export const TechStackList = ({ stack }: TechStackListProps) => (
  <ul className="flex flex-wrap justify-center md:justify-start gap-4">
    {stack &&
      stack.map((tech, idx) => <TechStackListItem index={idx} tech={tech} />)}
  </ul>
);
