import React from "react";

const TechStackListItem = ({ tech, index }) => (
  <li key={index + "_techStackItem"}>
    <figure className="text-center items-center justify-center">
      {tech.icon}
      <figcaption className="text-sm mt-1">{tech.name}</figcaption>
    </figure>
  </li>
);

export const TechStackList = ({ stack }) => (
  <ul className="flex flex-wrap justify-center md:justify-start gap-4">
    {stack &&
      stack.map((tech, idx) => <TechStackListItem index={idx} tech={tech} />)}
  </ul>
);
