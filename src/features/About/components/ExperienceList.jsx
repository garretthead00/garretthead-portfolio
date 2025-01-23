import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const ExperienceList = ({ inView }) => {
  return (
    <motion.article
      variants={fadeIn("right", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-1 flex-wrap justify-center gap-8 lg:gap-x-10"
    >
      <div>
        <div className="text-[36px] font-tertiary text-gradient">
          {inView ? <CountUp start={0} end={8} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">
          Industry <br /> Experience
        </div>
      </div>
      <div>
        <div className="text-[36px] font-tertiary text-gradient">
          {inView ? <CountUp start={0} end={6} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">Javascript</div>
      </div>
      <div>
        <div className="text-[36px] font-tertiary text-gradient">
          {inView ? <CountUp start={0} end={4} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">React</div>
      </div>
      <div>
        <div className="text-[36px] font-tertiary text-gradient">
          {inView ? <CountUp start={0} end={5} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">NodeJS</div>
      </div>
    </motion.article>
  );
};
