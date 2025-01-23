import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";
import { experience } from "../../../data";

import { TechStackList } from "./TechStack";

const CompanyLink = ({ url }) => (
  <div className="flex flex-col flex-1 items-end">
    <a
      href={url}
      className="btn w-9 h-9 mb-[42px] flex justify-center items-center"
    >
      <BsArrowUpRight />
    </a>
  </div>
);

const ExperienceSummary = ({ title, company, duration, description }) => {
  return (
    <>
      <h4 className="text-[20px] tracking-wider font-primary font-semibold">
        {title}
      </h4>

      <h4 className="text-[12px] tracking-wider font-primary font-semibold">
        {company} - {duration}
      </h4>
      <p className="font-secondary leading-tight">{description}</p>
    </>
  );
};

const ExperienceListItem = ({ role, index }) => {
  const { company, description, duration, companyLink, title, stack } = role;

  return (
    <li
      key={index + "_roleItem"}
      className="flex border-b border-white/20 h-fit mb-[12px] pb-2"
    >
      <div className="max-w-[476px]">
        <ExperienceSummary
          title={title}
          company={company}
          duration={duration}
          description={description}
        />
        <br />
        <TechStackList stack={stack} />
      </div>
      <CompanyLink url={companyLink} />
    </li>
  );
};

export const WorkExperience = () => {
  return (
    <motion.article
      variants={fadeIn("left", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.1 }}
      className="flex flex-1 mb-[12px] pb-4"
    >
      <ul>
        {experience.map((role, idx) => (
          <ExperienceListItem index={idx} role={role}/>
        ))}
      </ul>
    </motion.article>
  );
};
