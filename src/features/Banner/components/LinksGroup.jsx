import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const LinksGroup = () => {
  return (
    <motion.div
      variants={fadeIn("right", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="flex text-[32px] gap-x-6 max-w-max mx-auto lg:mx-0"
    >
      <a href="https://www.linkedin.com/in/garretthead">
        <FaLinkedin />
      </a>
      <a href="https://www.github.com/garretthead00">
        <FaGithub />
      </a>
    </motion.div>
  );
};
