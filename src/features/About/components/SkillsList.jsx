import React from "react";
import { skills } from "../../../data";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

const SkillsListItem = ({ index, tech }) => (
  <li key={index + "_techStackItem"}>
    <figure className="text-center items-center justify-center">
      {tech.icon}
      <figcaption className="text-sm mt-1">{tech.name}</figcaption>
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
    <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-2">
      Skills
    </h4>
    <ul className="flex flex-wrap gap-4 mx-auto justify-center">
      {skills &&
        skills.map((tech, idx) => <SkillsListItem index={idx} tech={tech} />)}
    </ul>
  </motion.article>
);
