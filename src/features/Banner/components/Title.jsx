import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const Title = () => {
  return (
    <motion.h1
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="text-[55px] font-bold leading-[0.8] lg:text-[110px]"
    >
      <span>Garrett Head</span>
    </motion.h1>
  );
};
