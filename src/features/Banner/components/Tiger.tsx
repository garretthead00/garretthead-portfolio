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
      className="flex-1 lg:flex mx-auto max-w-[482px] mix-blend-lighten"
    >
      <img src={TigerLogo} alt="Tiger Logo" />
    </motion.div>
  );
};
