import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";
import { education } from "../../../data";

export const JobTitle = () => (
  <motion.article
    variants={fadeIn("right", 0.3)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: false, amount: 0.3 }}
    className="flex-1 lg:bg-services lg:bg-bottom bg-no-repeat mix-blend-lighten mb-4"
  >
    <div className="flex flex-col justify-center items-center">
      <h2 className="h2 text-accent mb-6">Experience</h2>
      <h3 className="h3 max-w-[455px] lg:mb-16">Senior Software Engineer</h3>
    </div>

    <div className="hidden items-center lg:flex lg:flex-col">
      <img src={education.icon} alt="" className="w-[200px]" />
      <h4 className="text-l tracking-wider font-primary font-semibold mb-2">
        {education.degree} in {education.concentration}
      </h4>
    </div>
  </motion.article>
);
