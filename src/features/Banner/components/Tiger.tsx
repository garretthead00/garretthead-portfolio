import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";
import TigerLogo from "../../../assets/images/TigerLogo.png";

export const Tiger = () => {
  return (
    <motion.div
      variants={fadeIn("down", 0.3)}
      initial="hidden"
      whileInView={"show"}
      className="mx-auto max-w-[482px] flex-1 mix-blend-lighten lg:flex"
    >
      <img src={TigerLogo} alt="Tiger Logo" />
    </motion.div>
  );
};
