import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const ContactButton = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.6)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0"
    >
      <button
        className="btn btn-lg"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "#contact";
        }}
      >
        Contact Me
      </button>
    </motion.div>
  );
};
