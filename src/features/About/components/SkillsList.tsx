import React from "react";
import { skills, type TechItem } from "../../../data";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

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
  <motion.article
    variants={fadeIn("left", 0.3)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: false, amount: 0.3 }}
    className="flex flex-col text-center"
  >
    {/* <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-2">
      Skills
    </h4> */}
    <ul className="mx-auto flex flex-wrap justify-center gap-4">
      {skills &&
        skills.map((tech) => <SkillsListItem key={tech.name} tech={tech} />)}
    </ul>
  </motion.article>
);
