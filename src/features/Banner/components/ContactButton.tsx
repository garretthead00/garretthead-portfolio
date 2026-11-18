import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const ContactButton = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.6)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="mx-auto mb-12 flex max-w-max items-center gap-x-6 lg:mx-0"
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
